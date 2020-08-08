import React from 'react';
import { Link } from 'react-router-dom';

const SettingsBtn = () => {
    return (
        <button className="settings">
            <Link to={'/settings'}>EDIT PROFILE</Link>{' '}
        </button>
    );
};

export default SettingsBtn;
