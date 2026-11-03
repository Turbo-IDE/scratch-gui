import {ExtensionLibrary, fetchLibrary} from '../../../src/containers/extension-library.jsx';

const response = (ok, data, status = 200) => ({
    ok,
    status,
    json: () => Promise.resolve(data)
});

describe('extension gallery loading', () => {
    afterEach(() => {
        global.fetch.mockRestore();
    });

    test('keeps TurboWarp extensions when the Mistium catalog fails', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(response(true, {
                extensions: [{id: 'tw-test', name: 'TW Test', slug: 'tw-test'}]
            }))
            .mockResolvedValueOnce(response(false, null, 503));

        const gallery = await fetchLibrary();

        expect(gallery.map(item => item.extensionId)).toEqual(['tw-test']);
    });

    test('reports an error only when every remote catalog fails', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(response(false, null, 500))
            .mockResolvedValueOnce(response(false, null, 503));

        await expect(fetchLibrary()).rejects.toThrow('TurboWarp extensions');
    });

    test('uses the marketplace author as the extension credit', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(response(true, {extensions: []}))
            .mockResolvedValueOnce(response(true, {extensions: []}))
            .mockResolvedValueOnce(response(true, {
                ok: true,
                extensions: [{
                    extensionId: 'community-test',
                    name: 'Community Test',
                    author: 'Example Author',
                    extensionURL: 'https://example.com/community-test.js'
                }]
            }));

        const gallery = await fetchLibrary();

        expect(gallery.find(item => item.extensionId === 'community-test').credits)
            .toEqual(['Example Author']);
    });
});

describe('extension selection', () => {
    test('contains load failures and shows the app error alert', async () => {
        const onShowExtensionError = jest.fn();
        const library = Object.create(ExtensionLibrary.prototype);
        library.loadingExtensions = new Set();
        library.props = {
            onShowExtensionError,
            vm: {
                extensionManager: {
                    isExtensionLoaded: () => false,
                    loadExtensionURL: jest.fn(() => Promise.reject(new Error('load failed')))
                }
            }
        };

        await expect(library.handleItemSelect({
            extensionId: 'example',
            extensionURL: 'https://example.com/extension.js'
        })).resolves.toBe(false);

        expect(onShowExtensionError).toHaveBeenCalledTimes(1);
        expect(library.loadingExtensions.size).toBe(0);
    });
});
