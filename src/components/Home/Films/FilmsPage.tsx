import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Link } from 'react-router-dom';
import { reviewService } from '../../../services/reviewService';
import { Review, MovieList } from '../../../features/types';
import PosterWithUsername from './PosterWithUsername';
import PopularMovies from '../PopularMovies';
import { movieListService } from '../../../services/movieListService';
import PosterStack from '../../ProfilePage/PosterStack';
import ProfilePicture from '../../_helpers/ProfilePicture';
import { titleToUrl } from '../../../services/helpers';
import Footer from '../Footer';

const FilmsPage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [lists, setLists] = useState<MovieList[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const friendsReviews = async () => {
            const reviews = await reviewService.getReviewsByFriends(loggedUser?._id!, 6);
            const lists = await movieListService.getListsByFriends(loggedUser?._id!, 3);
            setReviews(reviews);
            setLists(lists);
            setLoading(false);
        };
        if (loggedUser) {
            friendsReviews();
        }
    }, [loggedUser]);
    if (!loading && loggedUser) {
        return (
            <>
                <section className="friends-reviews">
                    <h2>
                        Welcome back,{' '}
                        <Link
                            to={{
                                pathname: `/${loggedUser?.username}`,
                                state: {
                                    userID: loggedUser?._id,
                                },
                            }}
                        >
                            {loggedUser?.username}
                        </Link>
                        . Here's what your friends have been watching...
                    </h2>
                    <h4 className="h4-subtitle">NEW FROM FRIENDS</h4>
                    <div className="reviews-container">
                        {reviews.map((r) => (
                            <PosterWithUsername review={r} key={r._id} />
                        ))}
                    </div>
                    <PopularMovies />
                    <section className="lists-friends">
                        <h4 className="h4-subtitle">NEW FROM FRIENDS</h4>
                        {lists.map((list) => (
                            <article key={list._id}>
                                <PosterStack user={list.user} watchlist={null} custom_list={list} />
                                <p>
                                    <Link
                                        to={`/${list.user.username}/list/${titleToUrl(list.title)}`}
                                    >
                                        {list.title}
                                    </Link>
                                </p>
                                <p>
                                    <ProfilePicture user={list.user} />
                                    <Link
                                        to={{
                                            pathname: `/${list.user.username}`,
                                            state: {
                                                userID: list.user._id,
                                            },
                                        }}
                                    >
                                        {list.user.username}
                                    </Link>
                                </p>
                            </article>
                        ))}
                    </section>
                </section>
                <Footer />
            </>
        );
    }
    return null;
};

export default FilmsPage;
