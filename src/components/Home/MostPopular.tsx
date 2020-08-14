import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Poster from './Poster';
import { changeSignUpFormStatus } from '../../features/user/userSlice';

const MostPopular = () => {
    const { sign_up_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();
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
                <button
                    className="green-btn"
                    type="button"
                    onClick={() => dispatch(changeSignUpFormStatus(!sign_up_form))}
                >
                    CREATE AN ACCOUNT
                </button>
            </div>
            <figure className="backdrop">
                <Poster title={mostPopular.title} url={mostPopular.backdrop_path} tmdb={true} />
                <figcaption>
                    {`${mostPopular.title} (${mostPopular.release_date.slice(0, 4)})`}
                </figcaption>
            </figure>
        </article>
    );
};

export default MostPopular;
