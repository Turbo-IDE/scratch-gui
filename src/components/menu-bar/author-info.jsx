import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import UserAvatar from './user-avatar.jsx';
import Avatar from '../mw-avatar/avatar.jsx';
import {getLoadedProjectMeta} from '../../lib/mw-project-metadata';

import styles from './author-info.css';

const ActualAuthorInfo = ({
    className,
    imageUrl,
    projectTitle,
    // TODO: use userId to link to user's profile
    userId, // eslint-disable-line no-unused-vars
    username
}) => {
    const meta = getLoadedProjectMeta() || {};
    const metaAuthor = (meta && meta.author) || {};
    const authorName = username || metaAuthor.username || '';
    const authorImageUrl = imageUrl || metaAuthor.thumbnail || '';

    return (
        <div
            className={classNames(
                className,
                styles.authorInfo
            )}
        >
            {authorImageUrl ? (
                <UserAvatar
                    className={styles.avatar}
                    imageUrl={authorImageUrl}
                />
            ) : (
                <Avatar
                    className={styles.avatar}
                    username={typeof authorName === 'string' ? authorName : ''}
                    size={32}
                />
            )}
            <div className={styles.titleAuthor}>
                <h1 className={styles.projectTitle}>
                    {projectTitle}
                </h1>
                {authorName && (
                    <div>
                        <span className={styles.usernameLine}>
                            <FormattedMessage
                                defaultMessage="Nhà phát triển {username}"
                                description="Shows that a project was created by this user"
                                id="gui.authorInfo.byUser"
                                values={{
                                    username: <span className={styles.username}>{authorName}</span>
                                }}
                            />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

ActualAuthorInfo.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    projectTitle: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const AuthorInfo = ({projectId, ...props}) => {
    const meta = getLoadedProjectMeta() || {};
    const metaAuthor = (meta && meta.author) || {};
    const authorName = props.username || metaAuthor.username || '';
    const link = projectId && projectId !== '0' ?
        `https://scratch.mit.edu/projects/${projectId}` :
        authorName ? `/users/${encodeURIComponent(authorName)}` : null;
    return link ? (
        <a
            className={styles.link}
            href={link}
            target="_blank"
            rel="noreferrer"
        >
            <ActualAuthorInfo {...props} />
        </a>
    ) : <ActualAuthorInfo {...props} />;
};
AuthorInfo.propTypes = {
    projectId: PropTypes.string,
    username: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default AuthorInfo;
