import React from 'react';
import { Link } from 'react-router-dom';
import { MovieInstance, User, MovieList } from '../../features/types';
import Poster from '../Home/Poster';

interface props {
    user: User;
    watchlist: MovieInstance[] | null;
    custom_list: MovieList | null;
}

const PosterStack: React.FC<props> = ({ user, watchlist, custom_list }) => {
    if (watchlist) {
        return (
            <Link to={`/${user.username}/watchlist`}>
                <div className="poster-stack">
                    {watchlist.map((m, index) => (
                        <div key={m._id} className={`wrapper wrapper-${index}`}>
                            <Poster url={m.poster} title={m.title} tmdb={false} />
                        </div>
                    ))}
                </div>
            </Link>
        );
    } else if (custom_list) {
        const listTitle = custom_list.title.toLocaleLowerCase().replace(/ /g, '-');
        const fixedMovies: Array<null | MovieInstance> = [null, null, null, null, null];
        fixedMovies.splice(0, custom_list.movies.length, ...custom_list.movies.slice(0, 5));

        const fixedList: MovieList = {
            ...custom_list,
            movies: fixedMovies as MovieInstance[],
        };
        return (
            <Link
                to={{
                    pathname: `/${user.username}/lists/${listTitle}`,
                    state: {
                        userID: user._id,
                        list: custom_list,
                    },
                }}
            >
                <div className="poster-stack">
                    {fixedList.movies.map((m, index) =>
                        m ? (
                            <div key={m._id} className={`wrapper wrapper-${index}`}>
                                <Poster url={m.poster} title={m.title} tmdb={false} />
                            </div>
                        ) : (
                            <div className={`placeholder-${index} placeholder`} key={index}></div>
                        ),
                    )}
                </div>
            </Link>
        );
    }
    return null;
};

export default PosterStack;
