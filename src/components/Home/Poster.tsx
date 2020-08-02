import React from 'react';

interface PosterProps {
    url: string;
    title: string;
}

const Poster: React.FC<PosterProps> = ({ url, title }) => {
    return <img src={`https://image.tmdb.org/t/p/original${url}`} alt={`Poster for ${title}`} />;
};

export default Poster;
