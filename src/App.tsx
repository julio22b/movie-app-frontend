import React, { useEffect } from 'react';
import { NavBar } from './components/Header/NavBar';
import './styles/style.css';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from './features/user/userSlice';
import userService from './services/userService';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('filmlyCurrentUser')!);
        const userInfo = async () => {
            const data = await userService.getUserInfo(user.id);
            dispatch(saveUserInfo(data));
        };
        if (user) {
            userInfo();
        }
    }, [dispatch]);

    return (
        <>
            <Home />
        </>
    );
}

export default App;
