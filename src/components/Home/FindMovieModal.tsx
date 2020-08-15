import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { MovieInstance } from '../../features/types';
import { fetchMovieForReview } from '../../features/movies/popularMoviesSlice';
import NewReview from './NewReview';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import movieService from '../../services/movieService';
import { changeModalState } from '../../features/reviews/reviewsSlice';

const FindMovieModal = () => {
    const open = useSelector((state: RootState) => state.reviews.openSearchMovie);
    const { movie } = useSelector((state: RootState) => state.popularMovies.movie_for_review);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [foundMovie, setFoundMovie] = useState<MovieInstance>({} as MovieInstance);
    const dispatch = useDispatch();

    useEffect(() => {
        const findMovieOMDB = async () => {
            const movie = await movieService.useOMDB(searchQuery);
            if (movie) setFoundMovie(movie);
        };
        if (searchQuery.length > 2) {
            findMovieOMDB();
        }
    }, [searchQuery]);
    return ReactDOM.createPortal(
        <>
            <div
                className={open ? 'blanket open' : 'blanket'}
                onClick={() => dispatch(changeModalState())}
            ></div>
            <div className={open ? 'search-movie-modal open' : 'search-movie-modal'}>
                {!movie && (
                    <>
                        <p>
                            ADD TO YOUR FILMS...{' '}
                            <CloseModalBtn handleModalState={changeModalState} />
                        </p>
                        <label htmlFor="movie">Name of Film</label>
                        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
                        {foundMovie.title && (
                            <p onClick={() => dispatch(fetchMovieForReview(foundMovie))}>
                                {foundMovie.title} ({foundMovie.year}){' '}
                                <span>{foundMovie.director}</span>
                            </p>
                        )}
                    </>
                )}
                {movie && <NewReview />}
            </div>
        </>,
        document.getElementById('portal')!,
    );
};

export default FindMovieModal;
