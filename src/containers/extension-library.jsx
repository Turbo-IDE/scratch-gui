import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import log from '../lib/utils/log';
import {connect} from 'react-redux';
import {showStandardAlert} from '../reducers/alerts';

import extensionLibraryContent, {
    galleryError,
    galleryLoading,
    galleryMore
} from '../lib/libraries/extensions/index.jsx';
import extensionTags from '../lib/libraries/tw-extension-tags';
import {getVanillaPalette} from '../lib/mw-vanilla-palette';
import {marketplaceExtensions, submitMarketplaceExtension} from '../lib/community/api.js';
import Modal from './windowed-modal.jsx';

import LibraryComponent from '../components/tw-extension-library/extension-library.jsx';
import libraryStyles from '../components/tw-extension-library/extension-library.css';
import extensionIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    }
});

const toLibraryItem = extension => {
    if (typeof extension === 'object') {
        return ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        });
    }
    return extension;
};

const translateGalleryItem = (extension, locale) => ({
    ...extension,
    name: extension.nameTranslations[locale] || extension.name,
    description: extension.descriptionTranslations[locale] || extension.description
});

const readFileAsBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error || new Error('Could not read the cover image.'));
    reader.readAsDataURL(file);
});

let cachedGallery = null;
let cachedMarketplaceGallery = null;

const fetchCatalog = async (name, url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name} extensions: HTTP status ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.extensions)) {
        throw new Error(`${name} extensions: Invalid catalog response`);
    }
    return data.extensions;
};

const mapMarketplaceExtensions = extensions => extensions.map(extension => ({
    name: extension.name,
    description: extension.description,
    extensionId: extension.extensionId,
    extensionURL: extension.extensionURL,
    source: 'marketplace',
    tags: ['marketplace'],
    iconURL: extension.coverURL || extensionIcon,
    credits: [extension.author],
    incompatibleWithScratch: true
}));

const fetchMarketplaceLibrary = async () => {
    const data = await marketplaceExtensions();
    if (!data || !Array.isArray(data.extensions)) {
        throw new Error('TurboShare extension catalog returned an invalid response.');
    }
    const marketplace = mapMarketplaceExtensions(data.extensions);
    marketplace.marketplaceError = null;
    return marketplace;
};

const fetchLibrary = async () => {
    const [twResult, mistiumResult, marketplaceResult] = await Promise.allSettled([
        fetchCatalog('TurboWarp', 'https://extensions.turbowarp.org/generated-metadata/extensions-v0.json'),
        fetchCatalog('Mistium', 'https://extensions.mistium.com/generated-metadata/extensions-v0.json'),
        marketplaceExtensions()
    ]);

    if (
        twResult.status === 'rejected' &&
        mistiumResult.status === 'rejected' &&
        marketplaceResult.status === 'rejected'
    ) {
        throw new Error([
            twResult.reason.message,
            mistiumResult.reason.message,
            marketplaceResult.reason.message
        ].join('; '));
    }
    if (twResult.status === 'rejected') log.error(twResult.reason);
    if (mistiumResult.status === 'rejected') log.error(mistiumResult.reason);
    if (marketplaceResult.status === 'rejected') log.error(marketplaceResult.reason);
    let marketplaceError = marketplaceResult.status === 'rejected' ? marketplaceResult.reason : null;

    const twData = twResult.status === 'fulfilled' ? twResult.value : [];
    const mistiumData = mistiumResult.status === 'fulfilled' ? mistiumResult.value : [];
    const marketplaceData = marketplaceResult.status === 'fulfilled' &&
        Array.isArray(marketplaceResult.value.extensions) ? marketplaceResult.value.extensions : [];
    if (marketplaceResult.status === 'fulfilled' && !Array.isArray(marketplaceResult.value.extensions)) {
        marketplaceError = new Error('TurboShare extension catalog returned an invalid response.');
        log.error(marketplaceError);
    }
    
    // Process TurboWarp extensions
    const twExtensions = twData.map(extension => ({
        name: extension.name,
        nameTranslations: extension.nameTranslations || {},
        description: extension.description,
        descriptionTranslations: extension.descriptionTranslations || {},
        extensionId: extension.id,
        extensionURL: `https://extensions.turbowarp.org/${extension.slug}.js`,
        iconURL: `https://extensions.turbowarp.org/${extension.image || 'images/unknown.svg'}`,
        source: 'tw',
        tags: ['tw'],
        credits: [
            ...(extension.by || []),
            ...(extension.original || [])
        ].map(credit => {
            if (credit.link) {
                return (
                    <a
                        href={credit.link}
                        target="_blank"
                        rel="noreferrer"
                        key={credit.name}
                    >
                        {credit.name}
                    </a>
                );
            }
            return credit.name;
        }),
        docsURI: extension.docs ? `https://extensions.turbowarp.org/${extension.slug}` : null,
        samples: extension.samples ? extension.samples.map(sample => ({
            href: `${process.env.ROOT}editor?project_url=https://extensions.turbowarp.org/samples/${encodeURIComponent(sample)}.sb3`,
            text: sample
        })) : null,
        incompatibleWithScratch: true,
        featured: true
    }));
    
    // Process Mistium extensions
    const mistiumExtensions = mistiumData
        .filter(ext => ext.featured)
        .map(extension => ({
            name: extension.name,
            nameTranslations: extension.nameTranslations || {},
            description: extension.description,
            descriptionTranslations: extension.descriptionTranslations || {},
            extensionId: extension.id,
            extensionURL: `https://extensions.mistium.com/featured/${extension.name}.js`,
            iconURL: `https://extensions.mistium.com/${extension.image || 'images/unknown.svg'}`,
            source: 'mistium',
            tags: ['mistium'],
            credits: [
                ...(extension.by || []),
                ...(extension.original || [])
            ].map(credit => {
                if (credit.link) {
                    return (
                        <a
                            href={credit.link}
                            target="_blank"
                            rel="noreferrer"
                            key={credit.name}
                        >
                            {credit.name}
                        </a>
                    );
                }
                return credit.name;
            }),
            docsURI: null,
            samples: extension.samples ? extension.samples.map(sample => ({
                href: `${process.env.ROOT}editor?project_url=https://extensions-mistium.pages.dev/samples/${encodeURIComponent(sample)}.sb3`,
                text: sample
            })) : null,
            incompatibleWithScratch: true,
            featured: true
        }));

    const marketplace = mapMarketplaceExtensions(marketplaceData);
    
    // Combine both extension sets
    const extensions = [...twExtensions, ...mistiumExtensions, ...marketplace];
    extensions.marketplaceError = marketplaceError;
    return extensions;
};

const cacheGallery = (gallery, storeOnly) => {
    if (storeOnly) {
        cachedMarketplaceGallery = gallery;
        return;
    }
    cachedGallery = gallery;
    cachedMarketplaceGallery = gallery.filter(item => item.source === 'marketplace');
    cachedMarketplaceGallery.marketplaceError = gallery.marketplaceError;
};

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMarketplaceSubmit',
            'handleOpenSubmission',
            'handleCloseSubmission'
        ]);
        this.state = {
            gallery: this.props.storeOnly ? cachedMarketplaceGallery : cachedGallery,
            galleryError: null,
            galleryTimedOut: false,
            submitOpen: false,
            submitBusy: false,
            submitError: '',
            submitSuccess: ''
        };
        this._isMounted = false;
        this.galleryTimeout = null;
        this.loadingExtensions = new Set();
    }
    componentDidMount () {
        this._isMounted = true;
        if (!this.state.gallery) {
            this.galleryTimeout = setTimeout(() => {
                if (this._isMounted) {
                    this.setState({
                        galleryTimedOut: true
                    });
                }
            }, 750);

            const fetchCurrentLibrary = this.props.storeOnly ? fetchMarketplaceLibrary : fetchLibrary;
            fetchCurrentLibrary()
                .then(gallery => {
                    cacheGallery(gallery, this.props.storeOnly);
                    if (this._isMounted) {
                        this.setState({
                            gallery
                        });
                    }
                    clearTimeout(this.galleryTimeout);
                    this.galleryTimeout = null;
                })
                .catch(error => {
                    log.error(error);
                    if (this._isMounted) {
                        this.setState({
                            galleryError: error
                        });
                    }
                    clearTimeout(this.galleryTimeout);
                    this.galleryTimeout = null;
                });
        }
    }
    componentWillUnmount () {
        this._isMounted = false;
        clearTimeout(this.galleryTimeout);
        this.galleryTimeout = null;
    }
    handleItemSelect (item) {
        if (item.href) {
            return;
        }

        const extensionId = item.extensionId;

        if (extensionId === 'marketplace_submit') {
            this.setState({
                submitOpen: true,
                submitError: '',
                submitSuccess: ''
            });
            return;
        }

        if (extensionId === 'custom_extension') {
            this.props.onOpenCustomExtensionModal();
            return;
        }
        if (extensionId === 'procedures_enable_return') {
            if (this.props.onEnableProcedureReturns) {
                this.props.onEnableProcedureReturns();
            }
            
            // Switch to blocks tab after enabling returns
            if (typeof this.props.onActivateBlocksTab === 'function') {
                this.props.onActivateBlocksTab();
            }
            
            // Switch to My Blocks category after enabling returns (correct ID is "more")
            if (typeof this.props.onCategorySelected === 'function') {
                this.props.onCategorySelected('more');
            }
            return;
        }

        const url = item.extensionURL ? item.extensionURL : extensionId;
        if (!item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(extensionId)) {
                if (typeof this.props.onCategorySelected === 'function') {
                    this.props.onCategorySelected(extensionId);
                }
            } else {
                if (this.loadingExtensions.has(extensionId)) return;
                this.loadingExtensions.add(extensionId);
                return this.props.vm.extensionManager.loadExtensionURL(url)
                    .then(() => {
                        if (typeof this.props.onCategorySelected === 'function') {
                            this.props.onCategorySelected(extensionId);
                        }
                        return true;
                    })
                    .catch(err => {
                        log.error(err);
                        this.props.onShowExtensionError();
                        return false;
                    })
                    .finally(() => {
                        this.loadingExtensions.delete(extensionId);
                    });
            }
        }
    }
    async handleMarketplaceSubmit (event) {
        event.preventDefault();
        if (this.state.submitBusy) return;
        const form = event.currentTarget;
        const file = form.elements.source.files[0];
        const cover = form.elements.cover.files[0];
        if (!file || !/\.js$/i.test(file.name)) {
            this.setState({submitError: 'Choose a JavaScript (.js) file.'});
            return;
        }
        if (file.size === 0 || file.size > 2 * 1024 * 1024) {
            this.setState({submitError: 'The extension must be up to 2 MB.'});
            return;
        }
        this.setState({submitBusy: true, submitError: '', submitSuccess: ''});
        try {
            const result = await submitMarketplaceExtension({
                id: form.elements.id.value.trim(),
                name: form.elements.name.value.trim(),
                author: form.elements.author.value.trim(),
                version: form.elements.version.value.trim(),
                description: form.elements.description.value.trim(),
                source: await file.text(),
                coverBase64: cover ? await readFileAsBase64(cover) : '',
                coverMime: cover ? cover.type : ''
            });
            if (!result || !result.ok) throw new Error('The server could not accept this extension.');
            this.setState({
                submitSuccess: result.coverWarning ?
                    `Submitted for admin review, but cover upload failed: ${result.coverWarning}` :
                    'Submitted for admin review. It will appear in the store after approval.'
            });
            try {
                const gallery = this.props.storeOnly ?
                    await fetchMarketplaceLibrary() :
                    await fetchLibrary();
                cacheGallery(gallery, this.props.storeOnly);
                if (this._isMounted) this.setState({gallery});
            } catch (error) {
                log.error(error);
            }
        } catch (error) {
            const serverMessage = error.serverMessage || (error.data && error.data.error) || error.message;
            this.setState({submitError: serverMessage || 'Could not submit the extension.'});
        } finally {
            if (this._isMounted) this.setState({submitBusy: false});
        }
    }
    handleCloseSubmission () {
        this.setState({submitOpen: false});
    }
    handleOpenSubmission () {
        this.setState({submitOpen: true, submitError: '', submitSuccess: ''});
    }
    render () {
        const vanilla = getVanillaPalette();
        let library = null;
        if (this.props.storeOnly) {
            library = [];
            if (this.state.gallery) {
                library.push(...this.state.gallery.filter(item => item.source === 'marketplace'));
            } else if (this.state.galleryError) {
                library.push(toLibraryItem(galleryError));
            } else {
                library.push(toLibraryItem(galleryLoading));
            }
        } else if (vanilla || this.state.gallery || this.state.galleryError || this.state.galleryTimedOut) {
            library = extensionLibraryContent
                .filter(extension => !vanilla || (extension.tags.includes('scratch') && !extension.extensionURL))
                .map(toLibraryItem);
            if (!vanilla) {
                library.push('---');
                if (this.state.gallery) {
                    library.push(toLibraryItem(galleryMore));
                    const locale = this.props.intl.locale;
                    library.push(
                        ...this.state.gallery
                            .filter(i => i.extensionId !== 'faceSensing' && i.source !== 'marketplace')
                            .map(i => translateGalleryItem(i, locale))
                            .map(toLibraryItem)
                    );
                } else if (this.state.galleryError) {
                    library.push(toLibraryItem(galleryError));
                } else {
                    library.push(toLibraryItem(galleryLoading));
                }
            }
        }

        return (
            <React.Fragment>
                <LibraryComponent
                    data={library}
                    filterable
                    persistableKey="extensionId"
                    id="extensionLibrary"
                    tags={extensionTags}
                    title={this.props.storeOnly ?
                        'Extensions Store' :
                        this.props.intl.formatMessage(messages.extensionTitle)}
                    visible={this.props.visible}
                    storeOnly={this.props.storeOnly}
                    storeLoading={!this.state.gallery && !this.state.galleryError}
                    storeError={this.state.gallery ?
                        this.state.gallery.marketplaceError :
                        this.state.galleryError}
                    onPublish={this.handleOpenSubmission}
                    onItemSelected={this.handleItemSelect}
                    onRequestClose={this.props.onRequestClose}
                />
                {this.state.submitOpen ? (
                    <Modal
                        id="extensionMarketplaceSubmit"
                        contentLabel="Submit an extension"
                        onRequestClose={this.handleCloseSubmission}
                        width={640}
                        height={760}
                    >
                        <form
                            className={libraryStyles.submissionForm}
                            onSubmit={this.handleMarketplaceSubmit}
                        >
                            <header className={libraryStyles.submissionHeader}>
                                <span className={libraryStyles.submissionEyebrow}>{'EXTENSIONS STORE'}</span>
                                <h2>{'Publish an extension'}</h2>
                            </header>
                            <p className={libraryStyles.submissionDescription}>
                                {'Submit a version for admin review. '}
                                {'Only approved versions appear in the Extensions Store. '}
                                {'No account token is sent; provide a public author name. '}
                                {'To use an extension privately, choose Custom Extension instead.'}
                            </p>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Extension ID'}</span>
                                <input
                                    name="id"
                                    required
                                    maxLength={64}
                                    pattern="[A-Za-z0-9_-]+"
                                    placeholder="my_extension"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Name'}</span>
                                <input
                                    name="name"
                                    required
                                    maxLength={80}
                                    placeholder="My Extension"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Author name (shown publicly)'}</span>
                                <input
                                    name="author"
                                    required
                                    maxLength={80}
                                    placeholder="Your name or team"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Version'}</span>
                                <input
                                    name="version"
                                    required
                                    maxLength={40}
                                    defaultValue="1.0.0"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Description'}</span>
                                <textarea
                                    name="description"
                                    maxLength={500}
                                    rows={4}
                                    placeholder="What can this extension do?"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'Cover image (PNG, JPEG, or WebP; up to 2 MB)'}</span>
                                <input
                                    name="cover"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                />
                            </label>
                            <label className={libraryStyles.submissionField}>
                                <span>{'JavaScript source (.js, up to 2 MB)'}</span>
                                <input
                                    name="source"
                                    type="file"
                                    accept=".js,application/javascript"
                                    required
                                />
                            </label>
                            {this.state.submitError ? (
                                <p
                                    className={libraryStyles.submissionError}
                                    role="alert"
                                >
                                    {this.state.submitError}
                                </p>
                            ) : null}
                            {this.state.submitSuccess ? (
                                <p
                                    className={libraryStyles.submissionSuccess}
                                    role="status"
                                >
                                    {this.state.submitSuccess}
                                </p>
                            ) : null}
                            <button
                                className={libraryStyles.submissionButton}
                                type="submit"
                                disabled={this.state.submitBusy}
                            >
                                {this.state.submitBusy ? 'Submitting…' : 'Submit for review'}
                            </button>
                        </form>
                    </Modal>
                ) : null}
            </React.Fragment>
        );
    }
}

ExtensionLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateBlocksTab: PropTypes.func,
    onCategorySelected: PropTypes.func,
    onEnableProcedureReturns: PropTypes.func,
    onOpenCustomExtensionModal: PropTypes.func,
    onRequestClose: PropTypes.func,
    onShowExtensionError: PropTypes.func.isRequired,
    storeOnly: PropTypes.bool,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapDispatchToProps = dispatch => ({
    onShowExtensionError: () => dispatch(showStandardAlert('extensionLoadError'))
});

export default injectIntl(connect(null, mapDispatchToProps)(ExtensionLibrary));

export {ExtensionLibrary, fetchLibrary, fetchMarketplaceLibrary};
