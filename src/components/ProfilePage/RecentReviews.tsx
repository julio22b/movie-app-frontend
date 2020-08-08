import React from 'react';
import { Review, User } from '../../features/types';
import RecentReview from './RecentReview';

const RecentReviews: React.FC<{ reviews: Review[]; user: User }> = ({ reviews, user }) => {
    const fiveReviews = reviews.reverse().slice(0, 5);
    return (
        <section className="recent-reviews">
            <h4 className="h4-subtitle">RECENT REVIEWS</h4>
            {fiveReviews.map((r) => (
                <RecentReview review={r} key={r._id} />
            ))}
        </section>
    );
};

export default RecentReviews;
