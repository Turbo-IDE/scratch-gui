import {
    getRememberedForkSource,
    installForkSourceMetadata,
    normalizeForkSource,
    parseForkSource,
    rememberForkSource
} from '../../src/lib/community/fork-source.js';

describe('TurboShare fork source metadata', () => {
    afterEach(() => {
        rememberForkSource(null);
    });

    test('normalizes source identity and builds its canonical project link', () => {
        expect(normalizeForkSource({
            platform: 'turboshare',
            projectId: '1234',
            title: ' Original project ',
            author: 'Creator'
        })).toEqual({
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator',
            url: 'https://turboshare.org.uk/projects/1234'
        });
        expect(normalizeForkSource({platform: 'other', projectId: '1234'})).toBeNull();
        expect(normalizeForkSource({platform: 'turboshare', projectId: '../private'})).toBeNull();
    });

    test('parses and remembers a source passed from the TurboShare project page', () => {
        const source = {
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator'
        };
        expect(parseForkSource(JSON.stringify(source))).toMatchObject(source);
        rememberForkSource(source);
        expect(getRememberedForkSource()).toMatchObject(source);
        expect(parseForkSource('{invalid')).toBeNull();
    });

    test('adds fork attribution to exported Scratch project JSON', () => {
        const vm = {
            toJSON: () => JSON.stringify({targets: [], meta: {semver: '3.0.0'}})
        };
        installForkSourceMetadata(vm, {
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator'
        });

        expect(JSON.parse(vm.toJSON()).meta.turboshareFork).toMatchObject({
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator'
        });
        installForkSourceMetadata(vm, null);
        expect(JSON.parse(vm.toJSON()).meta.turboshareFork).toBeUndefined();
    });
});
