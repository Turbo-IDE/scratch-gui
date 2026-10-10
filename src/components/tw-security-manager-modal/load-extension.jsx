import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import styles from './load-extension.css';
import URL from './url.jsx';
import DataURL from './data-url.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import {APP_NAME} from '../../lib/constants/brand.js';

const LoadExtensionModal = props => (
    <div>
        {props.dangerousBuiltin ? (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="This project contains JavaScript patching blocks."
                    description="Warning title before a project enables JavaScript patching"
                    id="mw.loadExtension.patching"
                />
                <div className={styles.unsandboxedWarning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="JavaScript patching runs with full access to MistWarp. It could steal your login session, take over your account, read or change projects and settings, or run other malicious code. Only continue if you trust this project's author."
                        description="Warning before a project enables JavaScript patching"
                        id="mw.loadExtension.patchingWarning"
                    />
                </div>
            </React.Fragment>
        ) : props.dangerousJs ? (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="This project runs JavaScript with the {name} extension."
                    description="Warning title before a project loads an extension that runs JavaScript"
                    id="mw.loadExtension.jsExecution"
                    values={{name: props.dangerousJs}}
                />
                <div className={styles.unsandboxedWarning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="It runs with full access to MistWarp. It could steal your login session, take over your account, read or change projects and settings, or run other malicious code. Only continue if you trust this project's author."
                        description="Warning before a project loads an extension that runs JavaScript"
                        id="mw.loadExtension.jsExecutionWarning"
                    />
                </div>
            </React.Fragment>
        ) : props.url.startsWith('data:') ? (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="This project wants to add extra blocks (a custom extension) built into it:"
                    description="Part of modal asking for permission to automatically load custom extension"
                    id="tw.loadExtension.embedded"
                />
                <DataURL url={props.url} />
            </React.Fragment>
        ) : (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="This project wants to add extra blocks (a custom extension) from another website:"
                    description="Part of modal asking for permission to automatically load custom extension"
                    id="tw.loadExtension.url"
                />
                <URL url={props.url} />
            </React.Fragment>
        )}
        {(
            <React.Fragment>
                <label className={styles.unsandboxedContainer}>
                    <FancyCheckbox
                        className={styles.unsandboxedCheckbox}
                        checked
                        disabled
                    />
                    <FormattedMessage
                        defaultMessage="Give it full access (advanced)"
                        description="Part of modal asking for permission to automatically load custom extension"
                        id="tw.loadExtension.unsandboxed"
                    />
                </label>
                <div className={styles.unsandboxedWarning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="With full access, this code can do anything you can: steal your login, take over your account, or change your projects and settings. Only turn this on for a project you completely trust."
                        description="Warning shown before loading a custom extension without a sandbox"
                        id="tw.loadExtension.unsandboxedWarning"
                        values={{APP_NAME}}
                    />
                </div>
            </React.Fragment>
        )}
    </div>
);

LoadExtensionModal.propTypes = {
    dangerousBuiltin: PropTypes.bool,
    dangerousJs: PropTypes.string,
    url: PropTypes.string.isRequired
};

export default LoadExtensionModal;
