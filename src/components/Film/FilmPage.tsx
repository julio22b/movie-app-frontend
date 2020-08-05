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
import { MovieInstance } from '../../features/types';
import PosterCaption from './PosterCaption';
import FilmDetails from './FilmDetails';
import SignInBtn from '../_helpers/SignInBtn';

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
                        <PosterCaption watches={movie.watches} likes={movie.likes} />
                    </figure>
                    <div>
                        <FilmDetails {...movie} />
                        {!user && <SignInBtn />}
                        {user && <FilmActions />}
                        <section className="reviews">
                            <h4>RECENT REVIEWS</h4>
                            {movie.reviews.length
                                ? movie.reviews.map((review) => (
                                      <FilmReview
                                          movieTitle={movie.title}
                                          content={review.content}
                                          user={review.user}
                                          comments={review.comments}
                                          rating={review.rating}
                                          likes={review.likes}
                                          liked_movie={review.liked_movie}
                                          key={review._id}
                                          movie={review.movie}
                                          _id={review._id}
                                      />
                                  ))
                                : 'This film has no reviews yet.'}
                        </section>
                    </div>
                </article>
            </>
        );
    }
    return null;
};

export default FilmPage;
