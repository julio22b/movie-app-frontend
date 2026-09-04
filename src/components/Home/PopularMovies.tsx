import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchPopularMovies } from '../../features/movies/popularMoviesSlice';
import Poster from './Poster';
import { Link } from 'react-router-dom';
import { MovieOMDB } from '../../features/types';
import { titleToUrl } from '../../services/helpers';

const PopularMovies = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, errors, topSix } = useSelector((state: RootState) => state.popularMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies());
    }, [dispatch]);
    if (loading) {
        return null;
    }
    return (
        <section className="popular">
            {errors && <p>Couldn't get that data</p>}
            <p>POPULAR FILMS</p>
            {topSix.map((movie: MovieOMDB) => (
                <Link
                    to={{
                        pathname: `/film/${titleToUrl(movie.title)}`,
                        state: { year: movie.release_date.slice(0, 4) },
                    }}
                    key={movie.title}
                >
                    <Poster url={movie.poster_path} title={movie.title} tmdb={true} />
                </Link>
            ))}
        </section>
    );
};

export default PopularMovies;
