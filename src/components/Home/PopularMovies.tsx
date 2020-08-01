import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchPopularMovies } from '../../features/movies/popularMoviesSlice';

const PopularMovies = () => {
    const dispatch = useDispatch();
    const { loading, errors, topSix } = useSelector((state: RootState) => state.popularMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies());
    }, [dispatch]);
    return (
        <section className="popular">
            {errors && <p>Couldn't get that data</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                topSix.map((movie) => (
                    <img
                        key={movie.title}
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={`Poster for ${movie.title}`}
                    />
                ))
            )}
        </section>
    );
};

export default PopularMovies;
