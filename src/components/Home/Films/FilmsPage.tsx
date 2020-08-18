import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Link } from 'react-router-dom';
import reviewService from '../../../services/reviewService';
import { Review } from '../../../features/types';
import PosterWithUsername from './PosterWithUsername';
import PopularMovies from '../PopularMovies';

const FilmsPage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        const friendsReviews = async () => {
            const reviews = await reviewService.getReviewsByFriends(loggedUser?._id!);
            setReviews(reviews);
        };
        if (loggedUser) {
            friendsReviews();
        }
    }, [loggedUser]);
    return (
        <section className="friends-reviews">
            <h2>
                Welcome back, <Link to={`/${loggedUser?.username}`}>{loggedUser?.username}</Link>.
                Here's what your friends have been watching...
            </h2>
            <h4 className="h4-subtitle">NEW FROM FRIENDS</h4>
            <div className="reviews-container">
                {reviews.map((r) => (
                    <PosterWithUsername review={r} />
                ))}
            </div>
            <PopularMovies />
        </section>
    );
};

export default FilmsPage;
