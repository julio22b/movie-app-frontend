import React from 'react';
import { Link } from 'react-router-dom';
import NavWithUsername from '../Film/NavWithUsername';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';
import { MovieInstance } from '../../../features/types';
import { useProfileUser } from '../../_helpers/useProfileUser';

const UserWatchList = () => {
    const { user } = useProfileUser();

    if (user) {
        return (
            <section className="user-watchlist">
                <NavWithUsername user={user} />
                <h4 className="h4-subtitle">
                    {user.username.toLocaleUpperCase()} WANTS TO SEE {user.watch_list.length} FILMS
                </h4>
                <div className="watchlist-posters-container">
                    {user.watch_list.map(({ _id, title, year, poster }: MovieInstance) => (
                        <div key={_id}>
                            <Link
                                to={{
                                    pathname: `/film/${titleToUrl(title)}`,
                                    state: { year: year },
                                }}
                            >
                                <Poster url={poster} title={title} tmdb={false} />
                            </Link>
                            <span>
                                {title} ({year})
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    return null;
};

export default UserWatchList;
