import React from 'react';
import { User } from '../../features/types';
import RecentReview from './RecentReview';
import VoidMsg from './VoidMsg';

const RecentReviews: React.FC<{ user: User; loggedUserID: string | undefined }> = ({
    user,
    loggedUserID,
}) => {
    const threeReviews = [...user.reviews].reverse().slice(0, 3);
    return (
        <section className="recent-reviews">
            <h4 className="h4-subtitle">RECENT REVIEWS</h4>
            {threeReviews.length ? (
                threeReviews.map((r) => <RecentReview review={r} key={r._id} />)
            ) : (
                <VoidMsg
                    userID={user._id}
                    loggedUserID={loggedUserID}
                    text={'reviews'}
                    username={user.username}
                />
            )}
        </section>
    );
};

export default RecentReviews;
