import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import NavWithUsername from '../Film/NavWithUsername';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';
import { MovieInstance } from '../../../features/types';

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
                    {user.watch_list.map(({ _id, title, year, poster }: MovieInstance) => (
                        <div key={_id}>
                            <Link
                                to={{
                                    pathname: `/film/${titleToUrl(title)}`,
                                    state: { year: year },
                                }}
                            >
                                <Poster url={poster} title={title} tmdb={false} />
                            </Link>
                            <span>
                                {title} ({year})
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
