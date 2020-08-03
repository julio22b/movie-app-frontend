import React from 'react';

interface PosterProps {
    url: string;
    title: string;
    omdb: boolean;
}

const Poster: React.FC<PosterProps> = ({ url, title, omdb }) => {
    if (omdb) {
        return (
            <img src={`https://image.tmdb.org/t/p/original${url}`} alt={`Poster for ${title}`} />
        );
    }
    return <img src={url.replace(/&#x2F;/g, '/')} alt={`Poster for ${title}`} />;
};

export default Poster;
