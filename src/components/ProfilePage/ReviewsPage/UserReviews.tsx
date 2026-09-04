import React from 'react';
import { Link } from 'react-router-dom';
import NavWithUsername from '../Film/NavWithUsername';
import ReviewBody from '../ReviewBody';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';
import { useProfileUser } from '../../_helpers/useProfileUser';

const UserReviews = () => {
    const { user } = useProfileUser();

    if (user) {
        const sortByNewest = [...user.reviews].reverse();
        return (
            <section className="user-reviews">
                <NavWithUsername user={user} />
                <div className="reviews-container">
                    {sortByNewest.map((r) => {
                        const link = {
                            pathname: `/${user.username}/film/${titleToUrl(r.movie.title)}`,
                            state: { reviewID: r._id as string },
                        };
                        return (
                            <article className="review" key={r._id}>
                                <Link to={link}>
                                    <Poster
                                        url={r.movie.poster}
                                        title={r.movie.title}
                                        tmdb={false}
                                    />
                                </Link>
                                <ReviewBody review={r} link={link} />
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }
    return null;
};

export default UserReviews;
