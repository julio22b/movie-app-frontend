import React from 'react';
import github from '../../images/github-brands.svg';

const Footer = () => {
    return (
        <footer>
            Developed by Julio Bermúdez{' '}
            <a
                href="https://github.com/julio22b"
                rel="noopener noreferrer"
                target="_blank"
                title="My GitHub profile"
            >
                <img src={github} alt="GitHub icon" />
            </a>
        </footer>
    );
};

export default Footer;
