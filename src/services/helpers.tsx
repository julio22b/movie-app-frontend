import { MovieInstance } from '../features/types';
import { hideNotification, showNotification, Notif } from '../features/user/userSlice';
import { Dispatch } from 'react';

export const checkStatus = (arrayTocheck: MovieInstance[], title: string): boolean => {
    return arrayTocheck.some(
        (m) => m.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
    ) as boolean;
};

export const notify = (notification: Notif, dispatch: Dispatch<any>) => {
    dispatch(showNotification(notification));
    setTimeout(() => {
        dispatch(hideNotification());
    }, 5000);
};
