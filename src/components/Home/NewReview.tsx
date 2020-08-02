import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeMovieForReview } from '../../features/movies/popularMoviesSlice';

const NewReview = () => {
    const { loading, movie } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_review,
    );
    const dispatch = useDispatch();

    if (movie) {
        return (
            <section className="add-new-review">
                <figure>
                    <button onClick={() => dispatch(removeMovieForReview())}>BACK</button>
                    <img
                        src={movie.poster.replace(/&#x2F;/g, '/')}
                        alt={`Poster for ${movie.title} (${movie.year})`}
                    />
                </figure>
                <article>
                    <p>I WATCHED...</p>
                    <h3>
                        {movie.title} <span>{movie.year}</span>
                    </h3>
                    <form>
                        <textarea
                            name="content"
                            cols={30}
                            rows={10}
                            placeholder="Add a review..."
                        ></textarea>
                        <div className="like">
                            <label htmlFor="like">Like</label>
                            <input type="checkbox" name="like" />
                        </div>
                        <div className="rating">
                            <label htmlFor="rating">
                                Rating <span>x out of 5</span>
                            </label>
                            <div>
                                <input type="radio" name="rating" value="0.5" />
                                <input type="radio" name="rating" value="1" />
                                <input type="radio" name="rating" value="1.5" />
                                <input type="radio" name="rating" value="2" />
                                <input type="radio" name="rating" value="2.5" />
                                <input type="radio" name="rating" value="3" />
                                <input type="radio" name="rating" value="3.5" />
                                <input type="radio" name="rating" value="4" />
                                <input type="radio" name="rating" value="4.5" />
                                <input type="radio" name="rating" value="5" />
                            </div>
                        </div>
                    </form>
                </article>
            </section>
        );
    }
    return null;
};

export default NewReview;
