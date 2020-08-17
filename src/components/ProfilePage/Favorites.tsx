import React from 'react';
import Poster from '../Home/Poster';
import { favorite } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { titleToUrl } from '../../services/helpers';

const Favorites: React.FC<{ favorites: [favorite, favorite, favorite, favorite] }> = ({
    favorites,
}) => {
    return (
        <article className="favorite-films">
            <h4 className="h4-subtitle">FAVORITE FILMS</h4>
            {!favorites.every((f) => f === null) &&
                favorites.map((f, index) =>
                    f ? (
                        <Link
                            to={{
                                pathname: `/film/${titleToUrl(f.title)}`,
                                state: { year: f.year },
                            }}
                            key={f._id}
                        >
                            <Poster url={f.poster} title={f.title} tmdb={false} />
                        </Link>
                    ) : (
                        <div className="placeholder" key={index}></div>
                    ),
                )}
            {favorites.every((f) => f === null) && (
                <>
                    <div className="placeholder height"></div>
                    <div className="placeholder height"></div>
                    <div className="placeholder height"></div>
                    <div className="placeholder height"></div>
                </>
            )}
        </article>
    );
};

export default Favorites;
