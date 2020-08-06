import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Review } from '../../features/types';
import { RootState } from '../../app/store';
import reviewService from '../../services/reviewService';
import moment from 'moment';

import Poster from '../Home/Poster';
import ProfilePicture from '../_helpers/ProfilePicture';
import UsernameHeader from '../_helpers/UsernameHeader';
import LikeReviewBtn from '../_helpers/LikeReviewBtn';
import FilmActions from '../Film/FilmActions';
import SignInBtn from '../_helpers/SignInBtn';
import { fetchMovieForPage } from '../../features/movies/popularMoviesSlice';
import CommentForm from './CommentForm';

interface LocationState {
    reviewID: string;
}

const ReviewPage = () => {
    const { state } = useLocation<LocationState>();
    const [review, setReview] = useState<Review | null>(null);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const movieState = useSelector((state: RootState) => state.popularMovies.movie_for_page.movie);
    const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchReview = async () => {
            const review = (await reviewService.getReview(state.reviewID)) as Review;
            setReview(review);
            setIsLiked(loggedUser?.liked_reviews.some((r) => r === review?._id));
        };
        fetchReview();
    }, [state.reviewID, loggedUser]);

    useEffect(() => {
        if (review) dispatch(fetchMovieForPage(review.movie));
    }, [dispatch, review]);

    const likeReview = () => {
        reviewService.likeReview(loggedUser?._id as string, review?._id as string);
        setIsLiked(true);
    };

    const titleForURL = review?.movie.title.toLocaleLowerCase().replace(/ /g, '+');
    if (review && review.movie) {
        return (
            <section className="review-page">
                <div>
                    <figure>
                        <Link to={`/film/${titleForURL}`}>
                            <Poster
                                url={review.movie.poster}
                                title={review.movie.title}
                                tmdb={false}
                            />
                        </Link>
                    </figure>
                    <article>
                        <div className="user-info">
                            <ProfilePicture user={review.user} />
                            <UsernameHeader
                                user={review.user}
                                movieTitle={review.movie.title}
                                _id={review._id}
                            />
                        </div>
                        <h2 className="movie-title">
                            {review.movie.title} <span>{review.movie.year}</span>{' '}
                            <i className="stars" data-rating={`${review.rating}`}></i>
                        </h2>
                        <p className="date-watched">
                            Watched {moment(review.created_at).format('MMM DD[,] YYYY')}
                        </p>
                        <p className="content">{review.content}</p>
                        {loggedUser && (
                            <LikeReviewBtn
                                likeReview={likeReview}
                                isLiked={isLiked}
                                likes={review.likes as number}
                            />
                        )}
                    </article>
                    <CommentForm reviewID={review._id} />
                </div>
                {loggedUser && movieState ? <FilmActions /> : <SignInBtn />}
            </section>
        );
    }
    return null;
};

export default ReviewPage;
