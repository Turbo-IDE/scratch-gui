import {Blocks} from '../../../src/containers/blocks.jsx';
import SettingsStore from '../../../src/addons/settings-store-singleton';

// These tests call the real mw-load-workspace entry point with stubbed
// scratch-blocks so they only assert which loader was chosen.
const setupWorkspace = () => {
    const dom = {getElementsByTagName: () => new Array(150)};
    const Xml = {
        textToDom: jest.fn(() => dom),
        clearWorkspaceAndLoadFromXml: jest.fn(),
        clearWorkspaceAndLoadFromDescs: jest.fn(),
        clearWorkspaceAndLoadFromXmlDeferred: jest.fn(() => 'handle')
    };
    const blocks = Object.fromEntries(Array.from({length: 150}, (_, i) => [i, {}]));
    const data = {xml: '<xml>full</xml>', headerXml: '<xml>header</xml>', blocks: {blocks}};
    return {Xml, dom, data};
};

const makeBlocks = () => {
    const blocks = Object.create(Blocks.prototype);
    blocks.state = {
        flyoutWidth: null,
        paletteResizeEnabled: false,
        prompt: null
    };
    blocks.deferredWorkspaceLoad = null;
    blocks.unmounted = true;
    blocks.lastWorkspaceTargetId = null;
    blocks.props = {
        vm: {
            editingTarget: {id: 'sprite1'},
            editingCommands: undefined,
            emitWorkspaceUpdate: jest.fn()
        },
        workspaceMetrics: {targets: {sprite1: {scrollX: 0, scrollY: 0, scale: 1}}},
        updateToolboxState: jest.fn(),
        onShowImportError: jest.fn(),
        onWorkspaceMetricsChange: jest.fn(),
        setScriptLoadProgress: jest.fn()
    };
    return blocks;
};

describe('deferred workspace loading addon setting', () => {
    let enabled;

    beforeEach(() => {
        enabled = jest.spyOn(SettingsStore, 'getAddonEnabled');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const load = blocks => {
        const {Xml, dom, data} = setupWorkspace();
        blocks.ScratchBlocks = {Xml, Events: {disable: jest.fn(), enable: jest.fn()}};
        blocks.workspace = {
            removeChangeListener: jest.fn(),
            addChangeListener: jest.fn(),
            clearUndo: jest.fn(),
            isDragging: () => false,
            resize: jest.fn()
        };
        blocks.requestToolboxStateUpdate = jest.fn();
        blocks.onWorkspaceMetricsChange = jest.fn();
        blocks.cancelDeferredWorkspaceLoad = jest.fn();
        blocks.onWorkspaceUpdate(data);
        return {Xml, dom, data};
    };

    test('loads every block at once by default, like TurboWarp', () => {
        enabled.mockImplementation(() => false);
        const blocks = makeBlocks();
        const {Xml, dom} = load(blocks);

        expect(Xml.clearWorkspaceAndLoadFromXmlDeferred).not.toHaveBeenCalled();
        // 150 blocks would otherwise be streamed in.
        expect(Xml.clearWorkspaceAndLoadFromDescs).toHaveBeenCalledWith(dom, expect.anything(), blocks.workspace);
    });

    test('defers loading when the addon is turned on', () => {
        enabled.mockImplementation(id => id === 'lazy-workspace-loading');
        const blocks = makeBlocks();
        const {Xml} = load(blocks);

        expect(Xml.clearWorkspaceAndLoadFromXmlDeferred).toHaveBeenCalled();
        expect(Xml.clearWorkspaceAndLoadFromDescs).not.toHaveBeenCalled();
    });

    test('rebuilds the open workspace when the addon is toggled', () => {
        enabled.mockImplementation(() => false);
        const blocks = makeBlocks();
        const emitWorkspaceUpdate = blocks.props.vm.emitWorkspaceUpdate;

        blocks.handleAddonSettingChanged({
            detail: {addonId: 'lazy-workspace-loading', settingId: 'enabled'}
        });

        expect(emitWorkspaceUpdate).toHaveBeenCalled();
    });

    test('ignores settings for other addons', () => {
        enabled.mockImplementation(() => false);
        const blocks = makeBlocks();
        const emitWorkspaceUpdate = blocks.props.vm.emitWorkspaceUpdate;

        blocks.handleAddonSettingChanged({
            detail: {addonId: 'some-other-addon', settingId: 'enabled'}
        });

        expect(emitWorkspaceUpdate).not.toHaveBeenCalled();
    });
});
