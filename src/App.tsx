import React, { useEffect } from 'react';
import { NavBar } from './components/Header/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { fetchPopularMovies } from './features/movies/movieSlice';
import './styles/style.css';

function App() {
    const dispatch = useDispatch();
    const { loading, errors, movies } = useSelector((state: RootState) => state.movies);
    useEffect(() => {
        dispatch(fetchPopularMovies());
    }, []);
    return (
        <>
            <NavBar />
            <div className="popular">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map((movie) => (
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt=""
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default App;
