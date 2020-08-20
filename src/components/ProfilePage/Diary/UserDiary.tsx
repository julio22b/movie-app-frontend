import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { RootState } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getProfilePage } from '../../../features/user/userSlice';
import NavWithUsername from '../Film/NavWithUsername';
import Poster from '../../Home/Poster';
import MovieColumn from './MovieColumn';
import moment from 'moment';

const UserDiary = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, user, state.userID]);

    if (user) {
        const reviewsByDate = [...user.reviews].sort((a, b) => {
            const x = moment(a.watched_on);
            const y = moment(b.watched_on);
            return y.diff(x);
        });
        return (
            <section className="user-diary">
                <NavWithUsername user={user} />
                <article>
                    <p>MONTH</p>
                    <p>DAY</p>
                    <p>FILM</p>
                    <p>RELEASED</p>
                    <p>RATING</p>
                    <p>LIKE</p>
                    <p>REWATCH</p>
                    <p>REVIEW</p>
                </article>
                {reviewsByDate.map(
                    (review) =>
                        review.watched_on && (
                            <article className="entry" key={review._id}>
                                <p className="month">
                                    <span>
                                        {moment(review.watched_on.slice(5, 7), 'MM').format('MMM')}
                                    </span>
                                    <span>{review.watched_on.slice(0, 4)}</span>
                                </p>
                                <p className="day">{review.watched_on.slice(-2)}</p>
                                <MovieColumn review={review} />
                                <p>{review.movie.year}</p>
                                <p className="rating">
                                    <i className="stars" data-rating={review.rating}></i>
                                </p>
                                <p>
                                    <i className={review.liked_movie ? 'liked' : 'not-liked'}></i>
                                </p>
                                <p className="rewatch">{!review.first_watch && <i></i>}</p>
                                <p className="review">
                                    {review.content ? (
                                        <Link
                                            to={{
                                                pathname: `/${
                                                    user.username
                                                }/film/${review.movie.title
                                                    .toLocaleLowerCase()
                                                    .replace(/ /g, '-')}`,
                                                state: { reviewID: review._id },
                                            }}
                                        >
                                            <span>Read review</span>
                                            <i></i>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </p>
                                {/*  <p className="edit">
                                    <i></i>
                                </p> */}
                            </article>
                        ),
                )}
            </section>
        );
    }
    return null;
};

export default UserDiary;
