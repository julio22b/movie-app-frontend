import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Review, ReviewComment } from '../../features/types';
import { AppDispatch, RootState } from '../../app/store';
import { reviewService } from '../../services/reviewService';
import { userService } from '../../services/userService';
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
    const { state } = useLocation<Partial<LocationState> | undefined>();
    const { username, title } = useParams<{ username: string; title: string }>();
    const [review, setReview] = useState<Review | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [comments, setComments] = useState<ReviewComment[] | null>(review?.comments || null);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const movieState = useSelector((state: RootState) => state.popularMovies.movie_for_page.movie);
    const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
    const dispatch: AppDispatch = useDispatch();

    const stateReviewID = state?.reviewID;

    useEffect(() => {
        const resolveReviewID = async (): Promise<string | undefined> => {
            if (stateReviewID) return stateReviewID;
            const user = await userService.getUserByUsername(username);
            const matches = (user.reviews as Review[]).filter((r) => r.movie && titleToUrl(r.movie.title) === title);
            return matches.length ? matches[matches.length - 1]._id : undefined;
        };

        const fetchReview = async () => {
            setReview(null);
            setNotFound(false);
            try {
                const reviewID = await resolveReviewID();
                if (!reviewID) {
                    setNotFound(true);
                    return;
                }
                const fetchedReview = (await reviewService.getReview(reviewID)) as Review;
                setReview(fetchedReview);
                setComments(fetchedReview.comments);
                setIsLiked(loggedUser?.liked_reviews.some((reviewID: string) => reviewID === fetchedReview._id));
            } catch {
                setNotFound(true);
            }
        };
        fetchReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateReviewID, username, title]);

    useEffect(() => {
        if (review) dispatch(fetchMovieForPage(review.movie));
    }, [review, dispatch]);

    const likeReview = async () => {
        if (isLiked) return;
        try {
            await reviewService.likeReview(loggedUser?._id as string, review?._id as string);
            setIsLiked(true);
        } catch {}
    };

    if (review && review.movie) {
        const state = { year: review.movie.year };
        const pathname = `/film/${titleToUrl(review.movie.title)}`;
        return (
            <section className='review-page'>
                <div>
                    <figure>
                        <Link to={{ pathname, state }}>
                            <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
                        </Link>
                    </figure>
                    <article>
                        <div className='user-info'>
                            <ProfilePicture user={review.user} />
                            <UsernameHeader user={review.user} movieTitle={review.movie.title} _id={review._id} />
                        </div>

                        <MovieTitle review={review} />
                        {review.watched_on && (
                            <p className='date-watched'>Watched {moment(review.watched_on).format('MMM DD[,] YYYY')}</p>
                        )}
                        {review.content && <p className='content'>{review.content}</p>}
                        {loggedUser && <LikeReviewBtn likeReview={likeReview} isLiked={isLiked} likes={review.likes} />}
                    </article>
                    {loggedUser && movieState && <FilmActions />}
                    <section className='comments'>
                        <h4 className='h4-subtitle'>
                            {review.comments.length} {review.comments.length === 1 ? 'COMMENT' : 'COMMENTS'}
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
                {!loggedUser && <SignInBtn text='Sign in to log, rate or review' />}
            </section>
        );
    }
    if (notFound) {
        return (
            <section style={{ padding: '4em', textAlign: 'center' }}>
                <h2>Review not found</h2>
            </section>
        );
    }
    return null;
};

export default ReviewPage;
