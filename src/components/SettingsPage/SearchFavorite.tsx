import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MovieInstance } from '../../features/types';
import movieService from '../../services/movieService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import { changePickFavoriteFormStatus, addFavorite } from '../../features/user/userSlice';

interface props {
    setFavorites: React.Dispatch<React.SetStateAction<MovieInstance[]>>;
    index: number;
}

const SearchFavorite: React.FC<props> = ({ setFavorites, index }) => {
    const [pickedMovie, setPickedMovie] = useState({} as MovieInstance);
    const [query, setQuery] = useState<string>('');
    const { open } = useSelector((state: RootState) => state.userAuth.form_status.favorites_form);
    const dispatch = useDispatch();
    useEffect(() => {
        const pickMovie = async () => {
            const movie = await movieService.useOMDB(query);
            if (movie) setPickedMovie(movie);
        };
        if (query.length > 2) {
            pickMovie();
        }
    }, [query]);

    const handleClick = () => {
        dispatch(addFavorite({ movie: pickedMovie, index }));
        setQuery('');
        setPickedMovie({} as MovieInstance);
        dispatch(changePickFavoriteFormStatus(false));
    };

    return ReactDOM.createPortal(
        <>
            <div className={open ? 'blanket open' : 'blanket'}></div>
            <div className={open ? 'search-favorite open' : 'search-favorite'}>
                <h4>
                    PICK A FAVORITE FILM{' '}
                    <CloseModalBtn handleModalState={() => changePickFavoriteFormStatus(!open)} />
                </h4>
                <p>Name of Film</p>
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
                {pickedMovie.title && (
                    <p onClick={handleClick}>
                        {pickedMovie.title} ({pickedMovie.year}) <span>{pickedMovie.director}</span>
                    </p>
                )}
            </div>
        </>,
        document.getElementById('portal')!,
    );
};

export default SearchFavorite;
