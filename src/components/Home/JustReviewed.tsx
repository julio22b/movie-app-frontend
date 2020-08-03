import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchLatestReviews } from '../../features/reviews/reviewsSlice';

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
                    <img
                        src={review.movie.poster.replace(/&#x2F;/g, '/')}
                        alt={review.movie.title}
                        key={review._id}
                    />
                ))}
            </article>
        </section>
    );
};

export default JustReviewed;
