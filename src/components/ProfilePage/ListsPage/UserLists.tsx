import React, { useEffect } from 'react';
import NavWithUsername from '../Film/NavWithUsername';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import PosterStack from '../PosterStack';

const UserLists = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);
    if (user) {
        return (
            <section className="user-lists">
                <NavWithUsername user={user} />
                <div className="container">
                    <div className="left-col">
                        <h4 className="h4-subtitle">ALL LISTS</h4>

                        {user.lists.map((list) => (
                            <div className="list" key={list._id}>
                                <PosterStack user={user} custom_list={list} watchlist={null} />
                                <div>
                                    <h2>
                                        {list.title}{' '}
                                        <span>
                                            {list.movies.length === 1
                                                ? '1 film'
                                                : `${list.movies.length} films`}
                                        </span>
                                    </h2>
                                    <p>{list.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {loggedUser?._id === user._id && (
                        <button>
                            <Link to={'/list/new'}>Start a new list...</Link>{' '}
                        </button>
                    )}
                </div>
            </section>
        );
    }
    return null;
};

export default UserLists;
