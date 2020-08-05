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
import FilmReview from './FilmReview';
import FilmActions from './FilmActions';

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
                    <figure className="poster">
                        <Poster url={movie.poster} title={movie.title} tmdb={false} />
                    </figure>
                    <div>
                        <div className="details">
                            <h2 className="title">
                                {movie.title.replace(/&#x27;/g, "'")} ({movie.year})
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
                        {user && <FilmActions />}
                    </div>
                    <section className="reviews">
                        {movie.reviews.length
                            ? movie.reviews.map((review) => (
                                  <FilmReview
                                      movie={review.movie}
                                      content={review.content}
                                      user={review.user}
                                      comments={review.comments}
                                      rating={review.rating}
                                      likes={review.likes}
                                      liked_movie={review.liked_movie}
                                      key={review._id}
                                  />
                              ))
                            : 'This film has no reviews yet.'}
                    </section>
                </article>
            </>
        );
    }
    return null;
};

export default FilmPage;
