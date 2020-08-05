import React from 'react';
import { MovieInstance } from '../../features/types';

const FilmDetails: React.FC<MovieInstance> = ({
    title,
    year,
    director,
    synopsis,
    language,
    run_time,
}) => {
    return (
        <article className="details">
            <h2 className="title">
                {title.replace(/&#x27;/g, "'")} ({year})
                <span className="director">
                    directed by <strong>{director}</strong>
                </span>
            </h2>
            <p>{synopsis?.replace(/&#x27;/g, "'")}</p>
            <p className="meta">
                {language.split(', ')[0]} - {run_time}s
            </p>
        </article>
    );
};

export default FilmDetails;
