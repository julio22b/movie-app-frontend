import React, { useEffect } from 'react';
import { NavBar } from './components/Header/NavBar';
import './styles/style.css';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from './features/user/userSlice';
import userService from './services/userService';
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

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('filmlyCurrentUser')!);
        const userInfo = async () => {
            const data = await userService.getUserInfo(user.id);
            dispatch(saveUserInfo(data));
        };
        if (user) {
            userInfo();
        }
    }, [dispatch]);

    return (
        <>
            <FindMovieModal />
            <Notification />
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" exact>
                        <section>
                            <MostPopular />
                            <PopularMovies />
                            <JustReviewed />
                        </section>
                    </Route>
                    <Route path="/film/:title" exact>
                        <FilmPage />
                    </Route>
                    <Route path="/:username/film/:title" exact>
                        <ReviewPage />
                    </Route>
                    <Route path="/settings" exact>
                        <SettingsPage />
                    </Route>
                    <Route path="/:username" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/:username/films" exact>
                        <UserFilms />
                    </Route>
                    <Route path="/:username/reviews" exact>
                        <UserReviews />
                    </Route>
                    <Route path="/:username/watchlist" exact>
                        <UserWatchList />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
