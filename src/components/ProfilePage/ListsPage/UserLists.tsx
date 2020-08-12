import React, { useEffect } from 'react';
import NavWithUsername from '../Film/NavWithUsername';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';

const UserLists = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) dispatch(getProfilePage(state.userID));
    }, [dispatch, user, state.userID]);
    if (user) {
        return (
            <section className="user-lists">
                <NavWithUsername user={user} />
                <div className="container">
                    <div className="left-col">
                        <h4 className="h4-subtitle">ALL LISTS</h4>
                    </div>
                    <button>
                        <Link to={'/list/new'}>Start a new list...</Link>{' '}
                    </button>
                </div>
            </section>
        );
    }
    return null;
};

export default UserLists;
