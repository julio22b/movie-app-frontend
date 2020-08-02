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
        <article className="most-popular">
            <div className="taglines">
                <p>Track films you've watched</p>
                <p>Save those you want to see</p>
                <p>Tell your friends what's good</p>
            </div>
            <figure>
                <Poster title={mostPopular.title} url={mostPopular.backdrop_path} />
                <figcaption>
                    {`${mostPopular.title} (${mostPopular.release_date.slice(0, 4)})`}
                </figcaption>
            </figure>
        </article>
    );
};

export default MostPopular;
