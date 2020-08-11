import React from 'react';
import { Link } from 'react-router-dom';
import { MovieInstance, User } from '../../features/types';
import Poster from '../Home/Poster';

interface props {
    user: User;
    list: MovieInstance[];
    profile_section: string;
}

const PosterStack: React.FC<props> = ({ user, list, profile_section }) => {
    return (
        <Link to={`/${user.username}/${profile_section}`}>
            <div className="poster-stack">
                {list.map((m, index) => (
                    <div key={m._id} className={`wrapper wrapper-${index}`}>
                        <Poster url={m.poster} title={m.title} tmdb={false} />
                    </div>
                ))}
            </div>
        </Link>
    );
};

export default PosterStack;
