import React from 'react';
import { Review, User } from '../../features/types';
import FilmReview from '../Film/FilmReview';

const RecentReviews: React.FC<{ reviews: Review[]; user: User }> = ({ reviews, user }) => {
    return (
        <section className="recent-reviews">
            {reviews.map((r) => (
                <FilmReview movie={r.movie} content={r.content} user={user} comments={r.comments} />
            ))}
        </section>
    );
};

export default RecentReviews;
