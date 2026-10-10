const isGalleryExtensionUrl = url => (
    url.startsWith('https://extensions.turbowarp.org/') ||
    url.startsWith('https://extensions.mistium.com/')
);

const isTrustedExtensionUrl = url => isGalleryExtensionUrl(url) ||
    url.startsWith('http://localhost:8000/') ||
    url.startsWith('http://localhost:8601/') ||
    url.includes('/static/turboshare-extensions/');

export {isGalleryExtensionUrl};
export default isTrustedExtensionUrl;
