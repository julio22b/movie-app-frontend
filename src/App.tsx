import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavBar } from './components/Header/NavBar';
import './styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserInfo } from './features/user/userSlice';
import { userService } from './services/userService';
import PopularMovies from './components/Home/PopularMovies';
import MostPopular from './components/Home/MostPopular';
import JustReviewed from './components/Home/JustReviewed';
import FindMovieModal from './components/Home/FindMovieModal';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import FilmPage from './components/Film/FilmPage';
import Notification from './components/Home/Notification';
import ReviewPage from './components/ReviewPage/ReviewPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import UserFilms from './components/ProfilePage/Film/UserFilms';
import UserReviews from './components/ProfilePage/ReviewsPage/UserReviews';
import UserWatchList from './components/ProfilePage/UserWatchlist.tsx/UserWatchList';
import UserLists from './components/ProfilePage/ListsPage/UserLists';
import AddNewListPage from './components/ProfilePage/ListsPage/AddNewListPage';
import PeoplePage from './components/Home/People/PeoplePage';
import FilmsPage from './components/Home/Films/FilmsPage';
import UserDiary from './components/ProfilePage/Diary/UserDiary';
import { RootState } from './app/store';
import ListPage from './components/ProfilePage/DisplayList/ListPage';
import PrivateRoute from './components/_helpers/PrivateRoute';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SplashScreen from './components/_helpers/SplashScreen';

function App() {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(false);
    const [headerRef, setHeaderRef] = useState<any>(null);
    const initialized = useRef(false);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            if (!initialized.current) setShowSplash(true);
        }, 3000);

        const dismiss = () => {
            if (!initialized.current) {
                initialized.current = true;
                setShowSplash(false);
            }
        };

        const interceptorId = axios.interceptors.response.use(
            (response) => {
                dismiss();
                return response;
            },
            (error) => {
                dismiss();
                return Promise.reject(error);
            },
        );

        let user: { id: string } | null = null;
        try {
            user = JSON.parse(localStorage.getItem('filmlyCurrentUser') || 'null');
        } catch {
            localStorage.removeItem('filmlyCurrentUser');
        }
        if (user) {
            userService.getUserInfo(user.id).then((data) => {
                dispatch(saveUserInfo(data));
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

        return () => {
            clearTimeout(splashTimer);
            axios.interceptors.response.eject(interceptorId);
        };
    }, [dispatch]);

    const handleRef = (ref: any) => {
        setHeaderRef(ref);
    };

    return (
        <>
            {showSplash && <SplashScreen />}
            <Notification />
            <SpeedInsights />
            <Router>
                {!loading && <NavBar handleRef={handleRef} />}
                <FindMovieModal />
                <Switch>
                    <Route path='/' exact>
                        {loggedUser ? (
                            <FilmsPage />
                        ) : (
                            <section>
                                <MostPopular headerRef={headerRef} />
                                <PopularMovies />
                                <JustReviewed />
                            </section>
                        )}
                    </Route>
                    <Route path='/film/:title' exact>
                        <FilmPage headerRef={headerRef} />
                    </Route>
                    <Route path='/:username/film/:title' exact>
                        <ReviewPage />
                    </Route>
                    <PrivateRoute path='/settings' exact render={() => <SettingsPage />} />
                    <Route path='/people' exact>
                        <PeoplePage />
                    </Route>
                    <Route path='/:username' exact>
                        <ProfilePage />
                    </Route>
                    <Route path='/:username/films' exact>
                        <UserFilms />
                    </Route>
                    <Route path='/:username/reviews' exact>
                        <UserReviews />
                    </Route>
                    <Route path='/:username/diary' exact>
                        <UserDiary />
                    </Route>
                    <Route path='/:username/watchlist' exact>
                        <UserWatchList />
                    </Route>
                    <Route path='/:username/lists' exact>
                        <UserLists />
                    </Route>
                    <Route path='/:username/lists/:listName' exact>
                        <ListPage />
                    </Route>
                    <PrivateRoute exact path='/list/new' render={() => <AddNewListPage />} />
                    <Route>
                        <section style={{ padding: '4em', textAlign: 'center' }}>
                            <h2>Page not found</h2>
                        </section>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
