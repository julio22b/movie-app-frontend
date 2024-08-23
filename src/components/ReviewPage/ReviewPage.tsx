import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Review, ReviewComment } from '../../features/types';
import { AppDispatch, RootState } from '../../app/store';
import { reviewService } from '../../services/reviewService';
import moment from 'moment';

import Poster from '../Home/Poster';
import ProfilePicture from '../_helpers/ProfilePicture';
import UsernameHeader from '../_helpers/UsernameHeader';
import LikeReviewBtn from '../_helpers/LikeReviewBtn';
import FilmActions from '../Film/FilmActions';
import SignInBtn from '../_helpers/SignInBtn';
import { fetchMovieForPage } from '../../features/movies/popularMoviesSlice';
import CommentForm from './CommentForm';
import Comment from './Comment';
import MovieTitle from './MovieTitle';
import { titleToUrl } from '../../services/helpers';

interface LocationState {
    reviewID: string;
}

const ReviewPage = () => {
    const { state } = useLocation<LocationState>();
    const [review, setReview] = useState<Review | null>(null);
    const [comments, setComments] = useState<ReviewComment[] | null>(review?.comments || null);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const movieState = useSelector((state: RootState) => state.popularMovies.movie_for_page.movie);
    const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchReview = async () => {
            const fetchedReview = (await reviewService.getReview(state.reviewID)) as Review;
            setReview(fetchedReview);
            setComments(fetchedReview.comments);
            setIsLiked(loggedUser?.liked_reviews.some((r) => r === fetchedReview._id));
        };
        if (!review) fetchReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.reviewID]);

    useEffect(() => {
        if (review) dispatch(fetchMovieForPage(review.movie));
    }, [review, dispatch]);

    const likeReview = () => {
        reviewService.likeReview(loggedUser?._id as string, review?._id as string);
        setIsLiked(true);
    };

    if (review && review.movie) {
        const state = { year: review.movie.year };
        const pathname = `/film/${titleToUrl(review.movie.title)}`;
        return (
            <section className="review-page">
                <div>
                    <figure>
                        <Link to={{ pathname, state }}>
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

                        <MovieTitle review={review} />
                        {review.watched_on && (
                            <p className="date-watched">
                                Watched {moment(review.watched_on).format('MMM DD[,] YYYY')}
                            </p>
                        )}
                        {review.content && (
                            <p
                                className="content"
                                dangerouslySetInnerHTML={{ __html: review.content }}
                            ></p>
                        )}
                        {loggedUser && (
                            <LikeReviewBtn
                                likeReview={likeReview}
                                isLiked={isLiked}
                                likes={review.likes}
                            />
                        )}
                    </article>
                    {loggedUser && movieState && <FilmActions />}
                    <section className="comments">
                        <h4 className="h4-subtitle">
                            {review.comments.length}{' '}
                            {review.comments.length === 1 ? 'COMMENT' : 'COMMENTS'}
                        </h4>
                        {comments &&
                            comments.length > 0 &&
                            comments.map((c) => (
                                <Comment
                                    user={c.user}
                                    movie={c.movie}
                                    content={c.content}
                                    created_at={c.created_at}
                                    key={c._id}
                                />
                            ))}
                    </section>

                    {loggedUser && movieState ? (
                        <CommentForm reviewID={review._id} setComments={setComments} />
                    ) : (
                        <SignInBtn text={'Sign in to comment'} />
                    )}
                </div>
                {loggedUser && movieState && <FilmActions />}
                {!loggedUser && <SignInBtn text="Sign in to log, rate or review" />}
            </section>
        );
    }
    return null;
};

export default ReviewPage;
