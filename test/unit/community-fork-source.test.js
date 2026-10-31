import {
    getRememberedForkSource,
    isForkSourceOwner,
    installForkSourceMetadata,
    normalizeForkSource,
    parseForkSource,
    rememberForkSource,
    setForkSourceOwner
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
            author: 'Creator',
            forkTitle: 'My fork',
            rootSource: {
                projectId: 'original-1',
                title: 'Root project',
                author: 'Root creator'
            }
        })).toEqual({
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator',
            forkTitle: 'My fork',
            rootSource: {
                projectId: 'original-1',
                title: 'Root project',
                author: 'Root creator'
            },
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

    test('keeps only secure author avatar URLs', () => {
        expect(normalizeForkSource({
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator',
            authorAvatar: 'https://turboshare.org.uk/avatar.png'
        }).authorAvatar).toBe('https://turboshare.org.uk/avatar.png');
        expect(normalizeForkSource({
            platform: 'turboshare',
            projectId: '1234',
            authorAvatar: 'javascript:alert(1)'
        })).not.toHaveProperty('authorAvatar');
    });

    test('tracks whether the active TurboShare project belongs to the viewer', () => {
        const vm = {};
        setForkSourceOwner(vm, false);
        expect(isForkSourceOwner(vm)).toBe(false);
        setForkSourceOwner(vm, true);
        expect(isForkSourceOwner(vm)).toBe(true);
    });

    test('adds fork attribution to exported Scratch project JSON', () => {
        const vm = {
            toJSON: () => JSON.stringify({targets: [], meta: {semver: '3.0.0'}})
        };
        installForkSourceMetadata(vm, {
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator',
            rootSource: {
                projectId: '9876',
                title: 'Root project',
                author: 'Root creator'
            }
        });

        expect(JSON.parse(vm.toJSON()).meta.turboshareFork).toMatchObject({
            platform: 'turboshare',
            projectId: '1234',
            title: 'Original project',
            author: 'Creator',
            rootSource: {
                projectId: '9876',
                title: 'Root project',
                author: 'Root creator'
            }
        });
        installForkSourceMetadata(vm, null);
        expect(JSON.parse(vm.toJSON()).meta.turboshareFork).toBeUndefined();
    });
});
