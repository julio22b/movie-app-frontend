import React, { useState, useEffect } from 'react';
import { MovieInstance } from '../../../features/types';
import { useDispatch, useSelector } from 'react-redux';
import movieService from '../../../services/movieService';
import { addMovieForNewList, removeAllMoviesFromNewList } from '../../../features/user/userSlice';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../../app/store';
import movieListService from '../../../services/movieListService';
import { notify } from '../../../services/helpers';

const NewListForm = () => {
    const [query, setQuery] = useState<string>('');
    const [omdbMovie, setOmdbMovie] = useState<MovieInstance | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const movieList = useSelector(
        (state: RootState) => state.userAuth.form_status.new_list_form.movies,
    );
    const dispatch = useDispatch();
    const history = useHistory();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loggedUser?._id) {
            try {
                const data = await movieListService.createList(
                    { title, description, movies: movieList },
                    loggedUser._id,
                );

                notify({ message: data.message, type: 'success' }, dispatch);
                dispatch(removeAllMoviesFromNewList());
                history.push(`/${loggedUser.username}/lists`, { userID: loggedUser._id });
            } catch {
                notify({ message: 'Something went wrong', type: 'warning' }, dispatch);
            }
        }
    };

    return (
        <form className="new-list-form" onSubmit={(e) => handleSubmit(e)}>
            <h4 className="h4-subtitle">New List</h4>
            <div className="list-name">
                <label htmlFor="name">Name of list</label>
                <input
                    type="text"
                    required
                    maxLength={100}
                    name="name"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div className="list-description">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    cols={30}
                    rows={5}
                    maxLength={500}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
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
                        <Link
                            to={{
                                pathname: `/${loggedUser?.username}/lists`,
                                state: { userID: loggedUser?._id },
                            }}
                        >
                            CANCEL
                        </Link>
                    </button>
                    <button className="save green-btn">SAVE</button>
                </div>
            </div>
        </form>
    );
};

export default NewListForm;
