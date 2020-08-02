import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Axios from 'axios';
import { MovieInstance } from '../../features/types';
import { fetchMovieForReview } from '../../features/movies/popularMoviesSlice';

const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&t=`;

const FindMovieModal = () => {
    const open = useSelector((state: RootState) => state.reviews.openSearchMovie);
    const [searchQuery, setSearchQuery] = useState<String>('');
    const [foundMovie, setFoundMovie] = useState<MovieInstance>({} as MovieInstance);
    const dispatch = useDispatch();

    useEffect(() => {
        const findMovieOMDB = async () => {
            if (searchQuery.length > 2) {
                const processedQuery = searchQuery.replace(' ', '+');
                const response = await Axios.get(`${OMDB_URL}${processedQuery}`);
                const data = response.data;
                if (!data.Error) {
                    setFoundMovie({
                        title: data.Title,
                        year: data.Year,
                        synopsis: data.Plot,
                        poster: data.Poster,
                        director: data.Director,
                        actors: data.Actors.split(','),
                        country: data.Country,
                        genres: data.Genre.split(','),
                        language: data.Language,
                        run_time: data.Runtime,
                    });
                }
            }
        };
        if (searchQuery.length > 2) {
            findMovieOMDB();
        }
    }, [searchQuery]);

    if (open) {
        return (
            <div className="search-movie-modal">
                <p>ADD TO YOUR FILMS...</p>
                <label htmlFor="movie">Name of Film</label>
                <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
                {foundMovie.title && (
                    <p onClick={() => dispatch(fetchMovieForReview(foundMovie))}>
                        {foundMovie.title} ({foundMovie.year}) <span>{foundMovie.director}</span>
                    </p>
                )}
            </div>
        );
    }
    return null;
};

export default FindMovieModal;
