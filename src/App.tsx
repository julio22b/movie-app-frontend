import React, { useEffect } from 'react';
import { NavBar } from './components/Header/NavBar';
import './styles/style.css';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Home from './components/Home/Home';

function App() {
    return (
        <>
            <NavBar />
            <Home />
        </>
    );
}

export default App;
