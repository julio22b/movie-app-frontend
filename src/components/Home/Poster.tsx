import React, { useState } from 'react';

interface PosterProps {
    url: string;
    title: string;
    tmdb: boolean;
}

const Poster: React.FC<PosterProps> = ({ url, title, tmdb }) => {
    const [broken, setBroken] = useState(false);

    if (broken) {
        return <div className="poster-placeholder">{title}</div>;
    }

    const src = tmdb ? `https://image.tmdb.org/t/p/original${url}` : url.replace(/&#x2F;/g, '/');
    return (
        <img
            src={src}
            alt={`Poster for ${title}`}
            onError={() => setBroken(true)}
        />
    );
};

export default Poster;
