import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../features/types';

interface props {
    user: User;
    section?: string;
}

const NavLinkWithState: React.FC<props> = ({ user, section }) => {
    const pathname = section
        ? `/${user.username}/${section.toLocaleLowerCase()}`
        : `/${user.username}`;
    return (
        <li>
            <NavLink
                to={{
                    pathname,
                    state: {
                        userID: user._id,
                    },
                }}
                activeClassName="active"
                exact
            >
                {section || 'Profile'}
            </NavLink>
        </li>
    );
};

export default NavLinkWithState;
