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

let cachedGallery = null;

const fetchCatalog = async (name, url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name} extensions: HTTP status ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.extensions)) {
        throw new Error(`${name} extensions: Invalid catalog response`);
    }
    return data.extensions;
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

    const twData = twResult.status === 'fulfilled' ? twResult.value : [];
    const mistiumData = mistiumResult.status === 'fulfilled' ? mistiumResult.value : [];
    const marketplaceData = marketplaceResult.status === 'fulfilled' &&
        Array.isArray(marketplaceResult.value.extensions) ? marketplaceResult.value.extensions : [];
    if (marketplaceResult.status === 'fulfilled' && !Array.isArray(marketplaceResult.value.extensions)) {
        log.error(new Error('TurboShare extension catalog returned an invalid response.'));
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

    const marketplace = marketplaceData.map(extension => ({
        name: extension.name,
        description: extension.description,
        extensionId: extension.extensionId,
        extensionURL: extension.extensionURL,
        source: 'marketplace',
        tags: ['marketplace'],
        credits: [extension.author],
        incompatibleWithScratch: true
    }));
    
    // Combine both extension sets
    return [...twExtensions, ...mistiumExtensions, ...marketplace];
};

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMarketplaceSubmit',
            'handleCloseSubmission'
        ]);
        this.state = {
            gallery: cachedGallery,
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

            fetchLibrary()
                .then(gallery => {
                    cachedGallery = gallery;
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
                version: form.elements.version.value.trim(),
                description: form.elements.description.value.trim(),
                source: await file.text()
            });
            if (!result || !result.ok) throw new Error('The server could not accept this extension.');
            this.setState({submitSuccess: 'Submitted for admin review. It will appear in the store after approval.'});
            try {
                cachedGallery = await fetchLibrary();
                if (this._isMounted) this.setState({gallery: cachedGallery});
            } catch (error) {
                log.error(error);
            }
        } catch (error) {
            this.setState({submitError: error.message || 'Could not submit the extension.'});
        } finally {
            if (this._isMounted) this.setState({submitBusy: false});
        }
    }
    handleCloseSubmission () {
        this.setState({submitOpen: false});
    }
    render () {
        const vanilla = getVanillaPalette();
        let library = null;
        if (vanilla || this.state.gallery || this.state.galleryError || this.state.galleryTimedOut) {
            library = extensionLibraryContent
                .filter(extension => !vanilla || (extension.tags.includes('scratch') && !extension.extensionURL))
                .map(toLibraryItem);
            if (!vanilla) {
                library.push('---');
                library.push(toLibraryItem({
                    name: 'Publish an extension',
                    description: 'Submit an extension to the store for admin review.',
                    extensionId: 'marketplace_submit',
                    source: 'marketplace',
                    tags: ['marketplace'],
                    iconURL: extensionIcon
                }));
                if (this.state.gallery) {
                    library.push(toLibraryItem(galleryMore));
                    const locale = this.props.intl.locale;
                    library.push(
                        ...this.state.gallery
                            .filter(i => i.extensionId !== 'faceSensing')
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
                    title={this.props.intl.formatMessage(messages.extensionTitle)}
                    visible={this.props.visible}
                    onItemSelected={this.handleItemSelect}
                    onRequestClose={this.props.onRequestClose}
                />
                {this.state.submitOpen ? (
                    <Modal
                        id="extensionMarketplaceSubmit"
                        contentLabel="Submit an extension"
                        onRequestClose={this.handleCloseSubmission}
                        width={520}
                        height={600}
                    >
                        <form
                            onSubmit={this.handleMarketplaceSubmit}
                            style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 24}}
                        >
                            <h2 style={{margin: 0}}>{'Submit an extension'}</h2>
                            <p style={{margin: 0}}>
                                {'Submit a version for admin review. '}
                                {'Only approved versions appear in the Extensions Store. '}
                                {'To use an extension privately, choose Custom Extension instead.'}
                            </p>
                            <label>
                                {'Extension ID'}
                                <input
                                    name="id"
                                    required
                                    maxLength={64}
                                    pattern="[A-Za-z0-9_-]+"
                                />
                            </label>
                            <label>
                                {'Name'}
                                <input
                                    name="name"
                                    required
                                    maxLength={80}
                                />
                            </label>
                            <label>
                                {'Version'}
                                <input
                                    name="version"
                                    required
                                    maxLength={40}
                                    placeholder="1.0.0"
                                />
                            </label>
                            <label>
                                {'Description'}
                                <textarea
                                    name="description"
                                    maxLength={500}
                                    rows={3}
                                />
                            </label>
                            <label>
                                {'JavaScript source (.js, up to 2 MB)'}
                                <input
                                    name="source"
                                    type="file"
                                    accept=".js,application/javascript"
                                    required
                                />
                            </label>
                            {this.state.submitError ? <p role="alert">{this.state.submitError}</p> : null}
                            {this.state.submitSuccess ? <p role="status">{this.state.submitSuccess}</p> : null}
                            <button
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
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapDispatchToProps = dispatch => ({
    onShowExtensionError: () => dispatch(showStandardAlert('extensionLoadError'))
});

export default injectIntl(connect(null, mapDispatchToProps)(ExtensionLibrary));

export {ExtensionLibrary, fetchLibrary};
