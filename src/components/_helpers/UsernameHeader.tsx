import React from 'react';
import { User } from '../../features/types';
import { Link } from 'react-router-dom';
import { ReviewComment } from '../../features/types';

interface UsernameHeaderProps {
    user: User;
    movieTitle: string | undefined;
    _id: string | undefined;
    rating?: number;
    comments?: ReviewComment[];
}

const UsernameHeader: React.FC<UsernameHeaderProps> = ({
    user,
    movieTitle,
    rating,
    comments,
    _id,
}) => {
    return (
        <Link
            to={{
                pathname: `/${user.username}/film/${movieTitle
                    ?.toLocaleLowerCase()
                    .replace(/ /g, '+')}`,
                state: { reviewID: _id },
            }}
        >
            <h4 className="user">
                <span>Review by</span> {user.username}{' '}
                {rating && comments && (
                    <>
                        <i className="stars" data-rating={`${rating}`}></i>
                        <i className="comments-number"></i>
                        <span>{comments.length}</span>
                    </>
                )}
            </h4>
        </Link>
    );
};

export default UsernameHeader;
