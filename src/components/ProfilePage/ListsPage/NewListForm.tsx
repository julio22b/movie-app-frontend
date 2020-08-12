import React, { useState, useEffect } from 'react';
import { MovieInstance } from '../../../features/types';
import { useDispatch } from 'react-redux';
import movieService from '../../../services/movieService';
import { addMovieForNewList } from '../../../features/user/userSlice';

const NewListForm = () => {
    const [query, setQuery] = useState<string>('');
    const [omdbMovie, setOmdbMovie] = useState<MovieInstance | null>(null);
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
        dispatch(addMovieForNewList(movieSavedOnDB));
        setQuery('');
        setOmdbMovie(null);
    };

    return (
        <form className="new-list-form">
            <h4 className="h4-subtitle">New List</h4>
            <div className="list-name">
                <label htmlFor="name">Name of list</label>
                <input type="text" required maxLength={30} name="name" />
            </div>
            <div className="list-description">
                <label htmlFor="description">Description</label>
                <textarea name="description" cols={30} rows={5} maxLength={500}></textarea>
            </div>
            <div className="actions-container">
                <div className="add-film">
                    <button className="green-btn" type="button">
                        ADD A FILM
                    </button>
                    <div className="selection">
                        <input
                            type="text"
                            placeholder="Enter name of film..."
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                        {omdbMovie && (
                            <p onClick={handleClick}>
                                {omdbMovie?.title} {omdbMovie?.year}
                            </p>
                        )}
                    </div>
                </div>
                <div className="cancel-save">
                    <button className="cancel" type="button">
                        CANCEL
                    </button>
                    <button className="save green-btn">SAVE</button>
                </div>
            </div>
        </form>
    );
};

export default NewListForm;
