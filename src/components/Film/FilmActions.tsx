import React from 'react';
import ActionButton from './ActionButton';
import addToWatchList from '../../images/add-to-watchlist.png';
import notLiked from '../../images/like-gray.png';
import liked from '../../images/like-orange.png';
import notWatched from '../../images/watch-gray.png';
import watched from '../../images/watched-green.png';
import { fetchMovieForReview } from '../../features/movies/popularMoviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';

const FilmActions = () => {
    const movie = useSelector((state: RootState) => state.popularMovies.movie_for_page.movie)!;
    const dispatch = useDispatch();
    const review = () => {
        dispatch(fetchMovieForReview(movie));
        dispatch(changeModalState());
    };
    return (
        <aside className="film-actions">
            <div>
                <ActionButton icon_path={notWatched} caption={'Watch'} handleClick={() => null} />
                <ActionButton icon_path={notLiked} caption={'Like'} handleClick={() => null} />
                <ActionButton
                    icon_path={addToWatchList}
                    caption={'Watchlist'}
                    handleClick={() => null}
                />
            </div>
            <button className="review" onClick={review}>
                Review
            </button>
        </aside>
    );
};

export default FilmActions;
