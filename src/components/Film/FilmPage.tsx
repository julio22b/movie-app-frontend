import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchMovieForPage } from '../../features/movies/popularMoviesSlice';
import { useParams } from 'react-router-dom';
import movieService from '../../services/movieService';

const FilmPage = () => {
    const dispatch = useDispatch();
    const { error, loading, movie } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_page,
    );
    const params = useParams<{ title: string }>();
    useEffect(() => {
        const getMovie = async () => {
            const movie = await movieService.useOMDB(params.title);
            if (movie) dispatch(fetchMovieForPage(movie));
        };
        getMovie();
    }, [dispatch]);

    return (
        <article className="film-page">
            <figure>
                <img src="" alt="" />
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
};

export default FilmPage;
