const isGalleryExtensionUrl = url => (
    url.startsWith('https://extensions.turbowarp.org/') ||
    url.startsWith('https://extensions.mistium.com/')
);

const isMarketplaceExtensionUrl = url => {
    try {
        const parsed = new URL(url);
        return parsed.origin === 'https://turboshare.org.uk' &&
            /^\/api\/extensions\/marketplace\/source\/[a-f0-9]{64}$/.test(parsed.pathname) &&
            !parsed.search &&
            !parsed.hash;
    } catch (e) {
        return false;
    }
};

/**
 * /static/turboshare-extensions/ is only trusted when this editor serves it
 * itself. The same path on any other origin (for example
 * https://editor.turboshare.org.uk/static/turboshare-extensions/CloudDB.js) is
 * a remote extension and must go through the security prompt like any other
 * untrusted extension.
 * @param {string} url Extension URL from the project.
 * @returns {boolean} True if the extension is trusted.
 */
const isSameOriginTurboshareExtension = url => {
    if (typeof window === 'undefined') return false;
    try {
        const parsed = new URL(url, window.location.href);
        return parsed.origin === window.location.origin &&
            parsed.pathname.includes('/static/turboshare-extensions/');
    } catch (e) {
        return false;
    }
};

const isTrustedExtensionUrl = url => isGalleryExtensionUrl(url) ||
    isMarketplaceExtensionUrl(url) ||
    url.startsWith('http://localhost:8000/') ||
    url.startsWith('http://localhost:8601/') ||
    isSameOriginTurboshareExtension(url);

export {isGalleryExtensionUrl, isMarketplaceExtensionUrl};
export default isTrustedExtensionUrl;
