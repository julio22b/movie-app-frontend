import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import NavWithUsername from '../Film/NavWithUsername';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';

const UserWatchList = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);
    if (user) {
        return (
            <section className="user-watchlist">
                <NavWithUsername user={user} />
                <h4 className="h4-subtitle">
                    {user.username.toLocaleUpperCase()} WANTS TO SEE {user.watch_list.length} FILMS
                </h4>
                <div className="watchlist-posters-container">
                    {user.watch_list.map((m) => (
                        <div key={m._id}>
                            <Link
                                to={{
                                    pathname: `/film/${titleToUrl(m.title)}`,
                                    state: { year: m.year },
                                }}
                            >
                                <Poster url={m.poster} title={m.title} tmdb={false} />
                            </Link>
                            <span>
                                {m.title} ({m.year})
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    return null;
};

export default UserWatchList;
