import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const MostPopular = () => {
    const [mostPopular] = useSelector((state: RootState) => state.popularMovies.topSix);
    if (!mostPopular) {
        return null;
    }
    return (
        <div className="most-popular">
            <img src={`https://image.tmdb.org/t/p/original${mostPopular.backdrop_path}`} alt="" />
            <span>{`${mostPopular.title} (${mostPopular.release_date.slice(0, 4)})`}</span>
        </div>
    );
};

export default MostPopular;
