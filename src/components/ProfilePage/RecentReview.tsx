import React from 'react';
import { Review } from '../../features/types';
import Poster from '../Home/Poster';
import moment from 'moment';
import { Link } from 'react-router-dom';

const RecentReview: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <article className="review">
            <Link to={`/film/${review.movie.title.toLocaleLowerCase().replace(/ /g, '-')}`}>
                <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
            </Link>
            <div>
                <h2>
                    {review.movie.title} <span>{review.movie.year}</span>
                </h2>
                <p className="date">Watched {moment(review.created_at).format('MMM DD[,] YYYY')}</p>
                <p className="content">{review.content}</p>
                <div>{review.likes === 1 ? '1 like' : `${review.likes} likes`}</div>
            </div>
        </article>
    );
};

export default RecentReview;
