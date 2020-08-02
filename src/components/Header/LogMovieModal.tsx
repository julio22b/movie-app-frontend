import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Axios from 'axios';

const OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&t=`;
interface foundMovie {
    title: string;
    year: string;
    director: string;
}

const LogMovieModal = () => {
    const open = useSelector((state: RootState) => state.reviews.openSearchMovie);
    const [searchQuery, setSearchQuery] = useState<String>('');
    const [foundMovie, setFoundMovie] = useState<foundMovie>({ title: '', year: '', director: '' });

    useEffect(() => {
        const findMovieOMDB = async () => {
            if (searchQuery.length > 2) {
                const processedQuery = searchQuery.replace(' ', '+');
                const response = await Axios.get(`${OMDB_URL}${processedQuery}`);
                setFoundMovie({
                    title: response.data.Title,
                    year: response.data.Year,
                    director: response.data.Director,
                });
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
                    <p>
                        {foundMovie.title} ({foundMovie.year}) <span>{foundMovie.director}</span>
                    </p>
                )}
            </div>
        );
    }
    return null;
};

export default LogMovieModal;
