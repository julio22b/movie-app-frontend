import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {
    fetchMovieForPage,
    removeMovieForPage,
    fetchBackdropForPage,
} from '../../features/movies/popularMoviesSlice';
import { useParams, useLocation } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import Poster from '../Home/Poster';
import FilmReview from './FilmReview';
import FilmActions from './FilmActions';
import PosterCaption from './PosterCaption';
import FilmDetails from './FilmDetails';
import SignInBtn from '../_helpers/SignInBtn';
import { Review } from '../../features/types';

interface LocationState {
    year: string;
}

interface props {
    headerRef: any;
}

const FilmPage: React.FC<props> = ({ headerRef }) => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userAuth.user);
    const { error, loading, movie, backdrop } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_page,
    );
    const params = useParams<{ title: string }>();
    const { state } = useLocation<LocationState>();

    useEffect(() => {
        const getMovie = async () => {
            const movie = await movieService.useOMDB(params.title, state.year);
            if (movie) {
                dispatch(fetchMovieForPage(movie));
                const searchQuery = movie.title.replace(/ /g, '%20');
                dispatch(fetchBackdropForPage(searchQuery, Number(state.year)));
            }
        };
        getMovie();
        let current: any;
        if (headerRef) {
            current = headerRef.current;
            current.classList.add('transparent');
        }
        return () => {
            dispatch(removeMovieForPage());
            if (current) current.classList.remove('transparent');
        };
    }, [dispatch, params.title, state.year, headerRef]);

    useLayoutEffect(() => {
        document.querySelector('body')?.classList.add('darkest');
        return () => {
            document.querySelector('body')?.classList.remove('darkest');
        };
    }, []);

    if (loading) {
        return null;
    } else if (error) {
        return <p>The gremlins took that page</p>;
    } else if (movie) {
        return (
            <>
                <figure className="backdrop smaller">
                    <Poster url={backdrop} title={movie.title} tmdb={true} />
                </figure>
                <article className="film-page">
                    <figure className="poster">
                        <Poster url={movie.poster} title={movie.title} tmdb={false} />
                        <PosterCaption watches={movie.watches} likes={movie.likes} />
                    </figure>
                    <div>
                        <FilmDetails {...movie} />
                        {!user && <SignInBtn text="Sign in to log, rate or review" />}
                        {user && <FilmActions />}
                        <section className="reviews">
                            <h4>RECENT REVIEWS</h4>
                            {movie.reviews.length ? (
                                movie.reviews.map((review: Review) => (
                                    <FilmReview
                                        movieTitle={movie.title}
                                        key={review._id}
                                        {...review}
                                    />
                                ))
                            ) : (
                                <p>This film doesn't have any reviews.</p>
                            )}
                        </section>
                    </div>
                </article>
            </>
        );
    }
    return null;
};

export default FilmPage;
