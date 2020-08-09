import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MovieInstance } from '../../features/types';
import movieService from '../../services/movieService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import { changePickFavoriteFormStatus } from '../../features/user/userSlice';

interface props {
    setFavorites: React.Dispatch<React.SetStateAction<MovieInstance[]>>;
}

const SearchFavorite: React.FC<props> = ({ setFavorites }) => {
    const [pickedMovie, setPickedMovie] = useState({} as MovieInstance);
    const [query, setQuery] = useState('');
    const { pick_favorite } = useSelector((state: RootState) => state.userAuth.form_status);

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
        setFavorites((prev) => prev.concat(pickedMovie));
        setQuery('');
        setPickedMovie({} as MovieInstance);
    };

    return ReactDOM.createPortal(
        <>
            <div className={pick_favorite ? 'blanket open' : 'blanket'}></div>
            <div className={pick_favorite ? 'search-favorite open' : 'search-favorite'}>
                <h4>
                    PICK A FAVORITE FILM{' '}
                    <CloseModalBtn
                        handleModalState={() => changePickFavoriteFormStatus(!pick_favorite)}
                    />
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
