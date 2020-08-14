import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MovieInstance } from '../../features/types';
import movieService from '../../services/movieService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import { changePickFavoriteFormStatus, addFavorite } from '../../features/user/userSlice';

interface props {
    index: number;
}

const SearchFavorite: React.FC<props> = ({ index }) => {
    const [query, setQuery] = useState<string>('');
    const [omdbMovie, setOmdbMovie] = useState<MovieInstance | null>(null);
    const { open } = useSelector((state: RootState) => state.userAuth.form_status.favorites_form);
    const dispatch = useDispatch();
    useEffect(() => {
        const pickMovie = async () => {
            const movie = await movieService.useOMDB(query);
            if (movie) setOmdbMovie(movie);
        };
        if (query.length > 2) {
            pickMovie();
        }
    }, [query]);

    const handleClick = async () => {
        const movieSavedOnDB = await movieService.getMovieInstance(omdbMovie as MovieInstance);
        dispatch(addFavorite({ movie: movieSavedOnDB, index }));
        setQuery('');
        dispatch(changePickFavoriteFormStatus(false));
    };

    return ReactDOM.createPortal(
        <>
            <div
                className={open ? 'blanket open' : 'blanket'}
                onClick={() => changePickFavoriteFormStatus(false)}
            ></div>
            <div className={open ? 'search-favorite open' : 'search-favorite'}>
                <h4>
                    PICK A FAVORITE FILM{' '}
                    <CloseModalBtn handleModalState={() => changePickFavoriteFormStatus(!open)} />
                </h4>
                <p>Name of Film</p>
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
                {omdbMovie && (
                    <p onClick={handleClick}>
                        {omdbMovie.title} ({omdbMovie.year}) <span>{omdbMovie.director}</span>
                    </p>
                )}
            </div>
        </>,
        document.getElementById('portal')!,
    );
};

export default SearchFavorite;
