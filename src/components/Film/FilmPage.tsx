import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
    fetchMovieForPage,
    removeMovieForPage,
    fetchBackdropForPage,
} from '../../features/movies/popularMoviesSlice';
import { useParams } from 'react-router-dom';
import movieService from '../../services/movieService';
import Poster from '../Home/Poster';

const FilmPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userAuth.user);
    const { error, loading, movie, backdrop } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_page,
    );
    const params = useParams<{ title: string }>();
    useEffect(() => {
        dispatch(removeMovieForPage());
        const getMovie = async () => {
            const movie = await movieService.useOMDB(params.title);
            if (movie) {
                dispatch(fetchMovieForPage(movie));
                const searchQuery = movie.title.replace(/ /g, '%20');
                dispatch(fetchBackdropForPage(searchQuery));
            }
        };
        getMovie();
    }, [dispatch, params.title]);

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>The gremlins took that page</p>;
    } else if (movie) {
        return (
            <>
                <figure className="backdrop">
                    <Poster url={backdrop} title={movie.title} tmdb={true} />
                </figure>
                <article className="film-page">
                    <figure>
                        <Poster url={movie.poster} title={movie.title} tmdb={false} />
                    </figure>
                    <div>
                        <div className="details">
                            <h2 className="title">
                                {movie.title} ({movie.year})
                                <span className="director">
                                    directed by <strong>{movie.director}</strong>
                                </span>
                            </h2>
                            <p>{movie.synopsis?.replace(/&#x27;/g, "'")}</p>
                            <p className="meta">
                                {movie.language.split(', ')[0]} - {movie.run_time}s
                            </p>
                        </div>
                        <div>{!user && <button>Sign in to log, rate or review</button>}</div>
                    </div>
                </article>
            </>
        );
    }
    return null;
};

export default FilmPage;
