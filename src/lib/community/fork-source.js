const FORK_SOURCE_KEY = 'mw:turboshare-fork-source';

const setForkSourceOwner = (vm, isOwner) => {
    if (!vm) return;
    vm._mwTurboShareSourceOwner = Boolean(isOwner);
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mw:turboshare-source-changed'));
    }
};

const isForkSourceOwner = vm => Boolean(vm && vm._mwTurboShareSourceOwner);

const normalizeForkParty = source => {
    if (!source || typeof source !== 'object') return null;
    const projectId = String(source.projectId || '').trim();
    if (!/^[A-Za-z0-9_-]{1,80}$/.test(projectId)) return null;
    return {
        projectId,
        title: String(source.title || 'Untitled').trim()
            .slice(0, 100) || 'Untitled',
        author: String(source.author || 'Unknown').trim()
            .slice(0, 80) || 'Unknown'
    };
};

const normalizeForkSource = source => {
    if (!source || typeof source !== 'object' || source.platform !== 'turboshare') return null;
    const parent = normalizeForkParty(source);
    if (!parent) return null;
    const forkTitle = String(source.forkTitle || '').trim()
        .slice(0, 100);
    const authorAvatar = typeof source.authorAvatar === 'string' &&
        /^https:\/\//i.test(source.authorAvatar) ?
        source.authorAvatar.slice(0, 2048) :
        '';
    const rootSource = normalizeForkParty(source.rootSource);
    return {
        platform: 'turboshare',
        ...parent,
        ...(authorAvatar ? {authorAvatar} : {}),
        ...(forkTitle ? {forkTitle} : {}),
        ...(rootSource ? {rootSource} : {}),
        url: `https://turboshare.org.uk/projects/${encodeURIComponent(parent.projectId)}`
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
    vm._mwForkedSource = Boolean(vm._mwForkSource);
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
    isForkSourceOwner,
    installForkSourceMetadata,
    normalizeForkSource,
    parseForkSource,
    rememberForkSource,
    setForkSourceOwner
};
