import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSignInFormStatus, changeSignUpFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import SignInForm from './SignInForm';
import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';
import ProfilePicture from '../_helpers/ProfilePicture';
import CreateAccForm from './CreateAccForm';
import magnifier from '../../images/magnifier.png';
import letterboxd from '../../images/letterboxd.png';
import logoSimple from '../../images/logo-simple.png';
import { movieService } from '../../services/movieService';
import { titleToUrl } from '../../services/helpers';

export const NavBar: React.FC<{ handleRef: (ref: any) => void }> = ({ handleRef }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userAuth);
    const { sign_in_form, sign_up_form } = useSelector(
        (state: RootState) => state.userAuth.form_status,
    );
    const [openSearch, setOpenSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const searchRef = useRef<HTMLInputElement>(null);

    const openSearchInput = () => {
        setOpenSearch(!openSearch);
        if (openSearch && searchRef.current) searchRef.current.focus();
        setQuery('');
        setFoundMovies([]);
    };
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        handleRef(ref);

        const searchOMDB = async (query: string) => {
            const movies = await movieService.searchManyOMDB(query);
            setFoundMovies(movies);
        };
        if (query.length > 2) {
            searchOMDB(query);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const removeResults = () => {
        setQuery('');
        setFoundMovies([]);
    };

    return (
        <header id="header" ref={ref}>
            <p className="app-name">
                <Link to={'/'} style={{ display: 'flex' }}>
                    <img src={logoSimple} alt="Letterboxd logo" className="mobile" />
                    <img src={letterboxd} alt="Letterboxd logo" style={{ width: 300, height: 50, objectFit: 'cover' }} />
                </Link>
            </p>
            <CreateAccForm />
            {sign_in_form && <SignInForm />}
            <ul>
                {!user && (
                    <>
                        <li>
                            <button
                                onClick={() => dispatch(changeSignInFormStatus(!sign_in_form))}
                                type="button"
                            >
                                SIGN IN
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => dispatch(changeSignUpFormStatus(!sign_up_form))}
                            >
                                CREATE ACCOUNT
                            </button>
                        </li>
                    </>
                )}
                {user && (
                    <li className="has-dropdown">
                        <ProfilePicture user={user} />
                        {user.username}
                        <UserDropDown />
                    </li>
                )}
                <li>
                    <Link to={{ pathname: '/', state: { userID: user?._id } }}>FILMS</Link>
                </li>
                <li>
                    <Link to={`/people`}>PEOPLE</Link>
                </li>
                <li className="magnifier" onClick={openSearchInput}>
                    <button type="button">
                        {openSearch ? 'X' : <img src={magnifier} alt="" />}
                    </button>
                </li>
                <li className="log">
                    {user ? (
                        <button
                            onClick={() => dispatch(changeModalState())}
                            className={openSearch ? 'hide' : ''}
                        >
                            + LOG
                        </button>
                    ) : (
                        <button className={openSearch ? 'hide placeholder' : 'placeholder'}>
                            + LOG
                        </button>
                    )}

                    <input
                        type="search"
                        className={openSearch ? 'search open' : 'search'}
                        ref={searchRef}
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <div className="results">
                        {foundMovies &&
                            foundMovies.length > 0 &&
                            foundMovies.map((movie: any) => (
                                <Link
                                    to={{
                                        pathname: `/film/${titleToUrl(movie.title)}`,
                                        state: {
                                            year: movie.year,
                                        },
                                    }}
                                    onClick={removeResults}
                                    key={`${movie.title}+${movie.year}`}
                                >
                                    <p>
                                        <span>{movie.title}</span> <span>{movie.year}</span>
                                    </p>
                                </Link>
                            ))}
                    </div>
                </li>
            </ul>
        </header>
    );
};
