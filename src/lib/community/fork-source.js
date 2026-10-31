const FORK_SOURCE_KEY = 'mw:turboshare-fork-source';

const normalizeForkSource = source => {
    if (!source || typeof source !== 'object' || source.platform !== 'turboshare') return null;
    const projectId = String(source.projectId || '').trim();
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(projectId)) return null;
    const title = String(source.title || 'Untitled').trim()
        .slice(0, 100);
    const author = String(source.author || 'Unknown').trim()
        .slice(0, 80);
    return {
        platform: 'turboshare',
        projectId,
        title: title || 'Untitled',
        author: author || 'Unknown',
        url: `https://turboshare.org.uk/projects/${encodeURIComponent(projectId)}`
    };
};

const parseForkSource = value => {
    if (!value) return null;
    try {
        return normalizeForkSource(JSON.parse(value));
    } catch (e) {
        return null;
    }
};

const rememberForkSource = source => {
    try {
        const normalized = normalizeForkSource(source);
        if (normalized) {
            sessionStorage.setItem(FORK_SOURCE_KEY, JSON.stringify(normalized));
        } else {
            sessionStorage.removeItem(FORK_SOURCE_KEY);
        }
    } catch (e) {
        // Storage can be unavailable in private browsing; the active VM still retains its metadata.
    }
};

const getRememberedForkSource = () => {
    try {
        return parseForkSource(sessionStorage.getItem(FORK_SOURCE_KEY));
    } catch (e) {
        return null;
    }
};

const installForkSourceMetadata = (vm, source) => {
    if (!vm) return;
    vm._mwForkSource = normalizeForkSource(source);
    if (vm._mwForkMetadataInstalled) return;

    const originalToJSON = vm.toJSON;
    vm.toJSON = function (...args) {
        const serialized = originalToJSON.apply(this, args);
        const project = JSON.parse(serialized);
        const forkSource = normalizeForkSource(this._mwForkSource);
        if (forkSource) {
            project.meta = {...project.meta, turboshareFork: forkSource};
        }
        return JSON.stringify(project);
    };
    vm._mwForkMetadataInstalled = true;
};

export {
    getRememberedForkSource,
    installForkSourceMetadata,
    normalizeForkSource,
    parseForkSource,
    rememberForkSource
};
