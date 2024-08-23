import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchLatestReviews } from '../../features/reviews/reviewsSlice';
import Poster from './Poster';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Review } from '../../features/types';

const JustReviewed = () => {
    const { latest_reviews, loading, error } = useSelector((state: RootState) => state.reviews);
    const loadingMovies = useSelector((state: RootState) => state.popularMovies.loading);
    const { backdrop_loading } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_page,
    );
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLatestReviews());
    }, [dispatch]);
    if (loading || loadingMovies || backdrop_loading) {
        return null;
    } else if (error) {
        return <p>Couldn't get that data</p>;
    }
    return (
        <>
            <section className="latest-reviews">
                <p>JUST REVIEWED...</p>
                <article>
                    {latest_reviews.map((review: Review) => (
                        <Link
                            key={review._id}
                            to={{
                                pathname: `/${
                                    review.user.username
                                }/film/${review.movie.title
                                    .toLocaleLowerCase()
                                    .replace(/ /g, '-')}`,
                                state: {
                                    reviewID: review._id,
                                },
                            }}
                        >
                            <Poster
                                url={review.movie.poster}
                                title={review.movie.title}
                                tmdb={false}
                            />
                        </Link>
                    ))}
                </article>
            </section>
            <Footer />
        </>
    );
};

export default JustReviewed;
