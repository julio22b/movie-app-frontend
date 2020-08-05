import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Notification = () => {
    const { active, message, type } = useSelector(
        (state: RootState) => state.userAuth.notification,
    );
    return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
