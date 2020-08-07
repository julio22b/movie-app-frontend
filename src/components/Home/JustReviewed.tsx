import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchLatestReviews } from '../../features/reviews/reviewsSlice';
import Poster from './Poster';
import { Link } from 'react-router-dom';

const JustReviewed = () => {
    const { latest_reviews } = useSelector((state: RootState) => state.reviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLatestReviews());
    }, [dispatch]);

    return (
        <section className="latest-reviews">
            <p>JUST REVIEWED...</p>
            <article>
                {latest_reviews.map((review) => (
                    <Link
                        key={review._id}
                        to={{
                            pathname: `/${
                                review.user.username
                            }/film/${review.movie.title.toLocaleLowerCase().replace(/ /g, '-')}`,
                            state: {
                                reviewID: review._id,
                            },
                        }}
                    >
                        <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
                    </Link>
                ))}
            </article>
        </section>
    );
};

export default JustReviewed;
