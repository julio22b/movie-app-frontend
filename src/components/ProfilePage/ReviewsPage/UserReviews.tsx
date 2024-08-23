import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import NavWithUsername from '../Film/NavWithUsername';
import ReviewBody from '../ReviewBody';
import Poster from '../../Home/Poster';

const UserReviews = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);

    if (user) {
        const sortByNewest = [...user.reviews].reverse();
        return (
            <section className="user-reviews">
                <NavWithUsername user={user} />
                <div className="reviews-container">
                    {sortByNewest.map((r) => (
                        <article className="review" key={r._id}>
                            <Link
                                to={{
                                    pathname: `/${
                                        user.username
                                    }/film/${r.movie.title.toLocaleLowerCase().replace(/ /g, '-')}`,
                                    state: {
                                        reviewID: r._id,
                                    },
                                }}
                            >
                                <Poster url={r.movie.poster} title={r.movie.title} tmdb={false} />
                            </Link>
                            <ReviewBody
                                review={r}
                                link={{
                                    pathname: `/${
                                        user.username
                                    }/film/${r.movie.title.toLocaleLowerCase().replace(/ /g, '-')}`,
                                    state: {
                                        reviewID: r._id as string,
                                    },
                                }}
                            />
                        </article>
                    ))}
                </div>
            </section>
        );
    }
    return null;
};

export default UserReviews;
