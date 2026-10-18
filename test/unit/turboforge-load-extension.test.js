const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(
    path.join(__dirname, '../../TurboWS/Extensions/TurboForge.js'),
    'utf8'
);

const DATA_URL_PREFIX = 'data:application/javascript,';

/**
 * Extract the source of the "Nạp vào TurboWarp" (#runInject) click handler so the tests
 * exercise the code that actually ships in TurboForge.js instead of a duplicated copy.
 * The handler body contains no braces inside strings or comments, so plain brace
 * counting finds the end of the function expression reliably.
 * @returns {string} The full function expression assigned to the handler
 */
const extractRunInjectHandlerSource = () => {
    const anchor = 'content.querySelector(\'#runInject\').onclick = function () {';
    const anchorIndex = source.indexOf(anchor);
    expect(anchorIndex).toBeGreaterThanOrEqual(0);
    const bodyStart = anchorIndex + anchor.length - 1;
    let depth = 0;
    let bodyEnd = -1;
    for (let i = bodyStart; i < source.length; i++) {
        if (source[i] === '{') {
            depth++;
        } else if (source[i] === '}') {
            depth--;
            if (depth === 0) {
                bodyEnd = i;
                break;
            }
        }
    }
    expect(bodyEnd).toBeGreaterThanOrEqual(0);
    return 'function () ' + source.slice(bodyStart, bodyEnd + 1);
};

/**
 * Build the click handler with the closure values renderExportTab provides
 * (Scratch, code, alert).
 * @param {object} options The Scratch global stand-in, extension source, and alert spy
 * @returns {Function} The zero-argument click handler
 */
const createRunInjectHandler = ({vm, code, alert: alertFn}) => {
    // eslint-disable-next-line no-new-func
    const factory = new Function(
        'Scratch',
        'code',
        'alert',
        `return (${extractRunInjectHandlerSource()});`
    );
    return factory({vm}, code, alertFn);
};

/**
 * Minimal stand-in for vm.extensionManager plus the GUI-patched security manager.
 * The default sandbox decision mirrors an untrusted URL: everything loads 'iframe'.
 * @returns {object} Mock VM and inspection helpers
 */
const createVmMock = () => {
    const originalGetSandboxMode = jest.fn(async () => 'iframe');
    const securityManager = {
        getSandboxMode: originalGetSandboxMode
    };
    const sandboxModeDuringLoad = [];
    const extensionManager = {
        securityManager,
        loadExtensionURL: jest.fn(async url => {
            sandboxModeDuringLoad.push(await securityManager.getSandboxMode(url));
        })
    };
    return {
        vm: {extensionManager},
        extensionManager,
        securityManager,
        originalGetSandboxMode,
        sandboxModeDuringLoad,
        loadedUrls: () => extensionManager.loadExtensionURL.mock.calls.map(call => call[0])
    };
};

const flushAsync = () => new Promise(resolve => setTimeout(resolve, 0));


test('loads generated code as a data: URL instead of the blocked blob: URL', async () => {
    const code = '(function(Scratch) { Scratch.extensions.register({}); })(Scratch); // tiếng Việt 🐾';
    const {vm, loadedUrls} = createVmMock();
    const alerts = [];
    const handler = createRunInjectHandler({vm, code, alert: message => alerts.push(message)});

    handler();
    await flushAsync();

    const [url] = loadedUrls();
    expect(url.startsWith(DATA_URL_PREFIX)).toBe(true);
    expect(url.startsWith('blob:')).toBe(false);
    // _isValidExtensionURL only accepts http/https/data/file; this URL must decode
    // back to the exact generated source, Unicode included.
    expect(decodeURIComponent(url.slice(DATA_URL_PREFIX.length))).toBe(code);
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toContain('TURBO-IDE');
});

test('generated extensions load unsandboxed even when the default mode is iframe', async () => {
    const {vm, sandboxModeDuringLoad} = createVmMock();
    const handler = createRunInjectHandler({vm, code: 'code', alert: () => {}});

    handler();
    await flushAsync();

    // buildExtensionCode() throws without Scratch.extensions.unsandboxed, so the
    // load must not fall into the iframe worker.
    expect(sandboxModeDuringLoad).toEqual(['unsandboxed']);
});

test('the unsandboxed override only applies to the URL being loaded', async () => {
    const {vm, securityManager} = createVmMock();
    const handler = createRunInjectHandler({vm, code: 'code', alert: () => {}});

    handler();
    // While the override is installed, other URLs still go through the real check.
    await expect(securityManager.getSandboxMode('https://example.com/other.js')).resolves.toBe('iframe');
    await flushAsync();
});

test('restores the original getSandboxMode after the load succeeds', async () => {
    const {vm, securityManager, originalGetSandboxMode} = createVmMock();
    const handler = createRunInjectHandler({vm, code: 'code', alert: () => {}});

    handler();
    await flushAsync();

    expect(securityManager.getSandboxMode).toBe(originalGetSandboxMode);
});

test('reports load failures and still restores the original getSandboxMode', async () => {
    const {vm, securityManager, originalGetSandboxMode, extensionManager} = createVmMock();
    extensionManager.loadExtensionURL.mockRejectedValueOnce(new Error('script load failed'));
    const alerts = [];
    const handler = createRunInjectHandler({vm, code: 'code', alert: message => alerts.push(message)});

    handler();
    await flushAsync();

    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toContain('Có lỗi khi nạp tiện ích');
    expect(alerts[0]).toContain('script load failed');
    expect(securityManager.getSandboxMode).toBe(originalGetSandboxMode);
});

test('reports a clear error when the VM is unavailable', () => {
    const alerts = [];
    const handler = createRunInjectHandler({vm: undefined, code: 'code', alert: message => alerts.push(message)});

    handler();

    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toContain('Không tìm thấy extensionManager');
});
