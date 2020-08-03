import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchMovieForPage, removeMovieForPage } from '../../features/movies/popularMoviesSlice';
import { useParams } from 'react-router-dom';
import movieService from '../../services/movieService';
import Poster from '../Home/Poster';

const FilmPage = () => {
    const dispatch = useDispatch();
    const { error, loading, movie } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_page,
    );
    const params = useParams<{ title: string }>();
    useEffect(() => {
        dispatch(removeMovieForPage());
        const getMovie = async () => {
            const movie = await movieService.useOMDB(params.title);
            if (movie) dispatch(fetchMovieForPage(movie));
        };
        getMovie();
    }, [dispatch, params.title]);

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>The gremlins took that page</p>;
    } else if (movie) {
        return (
            <article className="film-page">
                <figure>
                    <Poster url={movie.poster} title={movie.title} omdb={false} />
                </figure>
                <div>
                    <div>
                        <h2>
                            NAME HERE <span>(year) directed by DIRECTOR</span>
                        </h2>
                        <p>description</p>
                    </div>
                    <div>
                        <p>Sign in to log,rat eor review</p>
                        <p>average rating</p>
                    </div>
                </div>
            </article>
        );
    }
    return null;
};

export default FilmPage;
