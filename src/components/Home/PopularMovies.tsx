import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchPopularMovies } from '../../features/movies/popularMoviesSlice';
import Poster from './Poster';
import { Link } from 'react-router-dom';

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
                <>
                    <p>POPULAR FILMS</p>
                    {topSix.map((movie) => (
                        <Link
                            to={{
                                pathname: `/film/${movie.title
                                    .toLocaleLowerCase()
                                    .replace(/ /g, '-')}`,
                                state: { year: movie.release_date.slice(0, 4) },
                            }}
                            key={movie.title}
                        >
                            <Poster url={movie.poster_path} title={movie.title} tmdb={true} />
                        </Link>
                    ))}
                </>
            )}
        </section>
    );
};

export default PopularMovies;
