import React from 'react';
import { Review } from '../../features/types';
import RecentReview from './RecentReview';

const RecentReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    const threeReviews = [...reviews]
        .reverse()
        .slice(0, 3)
        .sort((a, b) => b.likes - a.likes);
    return (
        <section className="recent-reviews">
            <h4 className="h4-subtitle">RECENT REVIEWS</h4>
            {threeReviews.map((r) => (
                <RecentReview review={r} key={r._id} />
            ))}
        </section>
    );
};

export default RecentReviews;
