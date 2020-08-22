import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Poster from './Poster';
import { changeSignUpFormStatus } from '../../features/user/userSlice';

const MostPopular: React.FC<{ headerRef: any }> = ({ headerRef }) => {
    const { sign_up_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();
    const [mostPopular] = useSelector((state: RootState) => state.popularMovies.topSix);

    useLayoutEffect(() => {
        document.querySelector('body')?.classList.add('darkest');
        let current: any;
        if (headerRef) {
            current = headerRef.current;
            current.classList.add('transparent');
        }
        return () => {
            document.querySelector('body')?.classList.remove('darkest');
            if (current) current.classList.remove('transparent');
        };
    }, [headerRef]);

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
