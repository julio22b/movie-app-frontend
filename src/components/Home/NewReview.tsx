import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeMovieForReview } from '../../features/movies/popularMoviesSlice';
import CloseModalBtn from '../_helpers/CloseModalBtn';
import reviewService from '../../services/reviewService';
import { fetchLatestReviews, changeModalState } from '../../features/reviews/reviewsSlice';
import { useHistory, withRouter } from 'react-router-dom';
import { addMovieToLiked, addMovieToWatched } from '../../features/user/userSlice';

const NewReview = () => {
    const { movie } = useSelector((state: RootState) => state.popularMovies.movie_for_review);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const dispatch = useDispatch();
    const [content, setContent] = useState<string>('');
    const [like, setLike] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [specifyDate, setSpecifyDate] = useState<boolean>(false);
    const [watched_on, setWatchedOn] = useState<string>('');
    const [first_watch, setFirstWatch] = useState<boolean>(true);
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (movie && loggedUser) {
            try {
                const { savedReview } = await reviewService.postReview(
                    { content, liked_movie: like, rating, watched_on, first_watch },
                    movie._id!,
                    loggedUser._id!,
                );
                dispatch(fetchLatestReviews());
                dispatch(removeMovieForReview());
                dispatch(changeModalState());
                dispatch(addMovieToWatched(movie));
                if (like) {
                    dispatch(addMovieToLiked(movie));
                }
                history.push(
                    `/${loggedUser.username}/film/${movie.title.toLowerCase().replace(/ /g, '-')}`,
                    {
                        reviewID: savedReview._id,
                    },
                );
                history.go(0);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const openDatePicker = () => {
        setSpecifyDate(!specifyDate);
        if (watched_on) {
            setWatchedOn('');
        } else if (!watched_on) {
            setWatchedOn(new Date().toLocaleDateString('en-CA'));
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
                        I WATCHED... <CloseModalBtn handleModalState={changeModalState} />
                    </p>
                    <h3>
                        {movie.title} <span>{movie.year}</span>
                    </h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="date">
                            <div className="date-picker">
                                <label htmlFor="add_date">
                                    {specifyDate ? 'on' : 'Specify the date you watched it'}
                                </label>
                                <input type="checkbox" name="add_date" onChange={openDatePicker} />
                                {specifyDate && (
                                    <input
                                        type="date"
                                        onChange={(e) => setWatchedOn(e.target.value)}
                                        value={watched_on}
                                        required
                                    />
                                )}
                                <div className="box"></div>
                            </div>
                            {specifyDate && (
                                <div className="first-watch">
                                    <label htmlFor="first_watch">
                                        I've watched this film before
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="first_watch"
                                        onChange={() => setFirstWatch(!first_watch)}
                                    />
                                    <div className="box"></div>
                                </div>
                            )}
                        </div>
                        <textarea
                            name="content"
                            cols={30}
                            rows={10}
                            placeholder="Add a review..."
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <div className="like">
                            <label htmlFor="like">Like</label>
                            <input type="checkbox" name="like" onChange={() => setLike(!like)} />
                            <i className={like ? 'not-liked actually-liked' : 'not-liked'}></i>
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
                                <i className="grey-stars"></i>
                                <i className="blue-stars"></i>
                                <i className="green-stars" data-value={rating * 2}></i>
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

export default withRouter(NewReview);
