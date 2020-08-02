import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Poster from './Poster';

const MostPopular = () => {
    const [mostPopular] = useSelector((state: RootState) => state.popularMovies.topSix);
    if (!mostPopular) {
        return null;
    }
    return (
        <div className="most-popular">
            <figure>
                <Poster title={mostPopular.title} url={mostPopular.backdrop_path} />
                <figcaption>
                    {`${mostPopular.title} (${mostPopular.release_date.slice(0, 4)})`}
                </figcaption>
            </figure>
        </div>
    );
};

export default MostPopular;
