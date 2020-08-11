import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import Navigation from '../Navigation';
import { getProfilePage } from '../../../features/user/userSlice';
import { useLocation } from 'react-router-dom';

interface LocationState {
    userID: string;
}

const UserFilms = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) dispatch(getProfilePage(state.userID));
    }, [dispatch, user, state.userID]);
    if (user) {
        return (
            <section className="user-films">
                <Navigation />
            </section>
        );
    }
    return null;
};

export default UserFilms;
