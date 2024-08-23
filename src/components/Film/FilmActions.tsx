import React, { useState } from 'react';
import ActionButton from './ActionButton';

// IMAGES
import addToWatchListIMG from '../../images/add-to-watchlist.png';
import removeFromWatchlistIMG from '../../images/remove-from-watchlist.png';
import notLikedIMG from '../../images/like-gray.png';
import likedIMG from '../../images/like-orange.png';
import notWatchedIMG from '../../images/watch-gray.png';
import watchedIMG from '../../images/watched-green.png';

//
import { fetchMovieForReview } from '../../features/movies/popularMoviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import movieService from '../../services/movieService';
import userService from '../../services/userService';
import { User } from '../../features/types';
import { checkStatus, notify } from '../../services/helpers';
import {
    removeMovieFromLiked,
    addMovieToLiked,
    removeMovieFromWatched,
    addMovieToWatched,
    removeMovieFromWatchList,
    addMovieToWatchList,
    Notif,
} from '../../features/user/userSlice';

const FilmActions = () => {
    const movie = useSelector((state: RootState) => state.popularMovies.movie_for_page.movie)!;
    const user = useSelector((state: RootState) => state.userAuth.user as User);
    const dispatch: AppDispatch = useDispatch();
    const [isLiked, setIsLiked] = useState<boolean>(
        checkStatus(user.liked_movies as [], movie.title),
    );
    const [isWatched, setisWatched] = useState<boolean>(
        checkStatus(user.watched_movies as [], movie.title),
    );
    const [isInWatchList, setIsInWatchList] = useState<boolean>(
        checkStatus(user.watch_list as [], movie.title),
);

    const review = () => {
        dispatch(fetchMovieForReview(movie));
        dispatch(changeModalState());
    };

    const handleLike = async () => {
        const action = isLiked ? 'unlike' : 'like';
        const { message } = await movieService.changeLikeStatus(user._id, movie._id, action);
        setIsLiked(!isLiked);
        if (action === 'unlike') {
            dispatch(removeMovieFromLiked(movie._id as string));
        }
        dispatch(addMovieToLiked(movie));
        const notification: Notif = {
            message,
            type: isLiked ? 'warning' : 'success',
        };
        notify(notification, dispatch);
    };

    const handleDiary = async () => {
        const action = isWatched ? 'remove-from-diary' : 'add-to-diary';
        const { message } = await userService.changeWatchedStatus(user._id, movie._id, action);
        setisWatched(!isWatched);
        if (action === 'remove-from-diary') {
            dispatch(removeMovieFromWatched(movie._id as string));
        }
        dispatch(addMovieToWatched(movie));
        const notification: Notif = {
            message,
            type: isWatched ? 'warning' : 'success',
        };
        notify(notification, dispatch);
    };

    const handleWatchList = async () => {
        const action = isInWatchList ? 'remove-from-watchlist' : 'add-to-watchlist';
        const { message } = await userService.changeWatchListStatus(user._id, movie._id, action);
        setIsInWatchList(!isInWatchList);
        if (action === 'remove-from-watchlist') {
            dispatch(removeMovieFromWatchList(movie._id as string));
        }
        dispatch(addMovieToWatchList(movie));
        const notification: Notif = {
            message,
            type: isInWatchList ? 'warning' : 'success',
        };
        notify(notification, dispatch);
    };
    return (
        <aside className="film-actions">
            <div>
                <ActionButton
                    icon_path={isWatched ? watchedIMG : notWatchedIMG}
                    caption={isWatched ? 'Watched' : 'Watch'}
                    handleClick={handleDiary}
                    marked={isWatched}
                />
                <ActionButton
                    icon_path={isLiked ? likedIMG : notLikedIMG}
                    caption={isLiked ? 'Liked' : 'Like'}
                    handleClick={handleLike}
                    marked={isLiked}
                />
                <ActionButton
                    icon_path={isInWatchList ? removeFromWatchlistIMG : addToWatchListIMG}
                    caption={'Watchlist'}
                    handleClick={handleWatchList}
                    marked={isInWatchList}
                />
            </div>
            <button className="review" onClick={review}>
                Review
            </button>
        </aside>
    );
};

export default FilmActions;
