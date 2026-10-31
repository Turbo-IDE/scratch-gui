import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './user-avatar.css';

const UserAvatar = ({
    className,
    imageUrl,
    onError
}) => (
    <img
        className={classNames(
            className,
            styles.userThumbnail
        )}
        src={imageUrl}
        onError={onError}
        draggable={false}
    />
);

UserAvatar.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    onError: PropTypes.func
};

export default UserAvatar;
