import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeMovieForReview } from '../../features/movies/popularMoviesSlice';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import reviewService from '../../services/reviewService';
import { fetchLatestReviews, changeModalState } from '../../features/reviews/reviewsSlice';

const NewReview = () => {
    const { loading, movie } = useSelector(
        (state: RootState) => state.popularMovies.movie_for_review,
    );
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const dispatch = useDispatch();
    const [content, setContent] = useState<string>('');
    const [like, setLike] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (movie && loggedUser) {
            try {
                await reviewService.postReview(
                    { content, liked_movie: like, rating },
                    movie._id!,
                    loggedUser._id!,
                );
                dispatch(fetchLatestReviews());
                dispatch(removeMovieForReview());
                dispatch(changeModalState());
            } catch (e) {
                console.log(e);
            }
        }
    };

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
                    <p>
                        I WATCHED... <CloseModalBtn />
                    </p>
                    <h3>
                        {movie.title} <span>{movie.year}</span>
                    </h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <textarea
                            name="content"
                            cols={30}
                            rows={10}
                            placeholder="Add a review..."
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                        <div className="like">
                            <label htmlFor="like">Like</label>
                            <input type="checkbox" name="like" onChange={() => setLike(!like)} />
                        </div>
                        <div className="rating">
                            <label htmlFor="rating">
                                Rating <span>{rating} out of 5</span>
                            </label>
                            <div
                                onChangeCapture={(e) =>
                                    setRating(Number((e.target as HTMLInputElement).value))
                                }
                            >
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
                        <button>SAVE</button>
                    </form>
                </article>
            </section>
        );
    }
    return null;
};

export default NewReview;
