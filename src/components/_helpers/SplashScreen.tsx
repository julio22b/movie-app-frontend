import React from 'react';
import letterboxd from '../../images/letterboxd.png';

const SplashScreen = () => (
    <div className='splash-screen'>
        <img src={letterboxd} alt='App logo' className='splash-logo' />
        <div className='splash-spinner' />
        <p className='splash-message'>Please wait while the server wakes up. It may take a few seconds.</p>
    </div>
);

export default SplashScreen;
