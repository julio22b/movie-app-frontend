import React, { useEffect, useState } from 'react';
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

function App() {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [loading, setLoading] = useState(true);
    const [headerRef, setHeaderRef] = useState<any>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('filmlyCurrentUser')!);
        const userInfo = async () => {
            const data = await userService.getUserInfo(user.id);
            dispatch(saveUserInfo(data));
            setLoading(false);
        };
        if (user) {
            userInfo();
        }
        if (!user) {
            setLoading(false);
        }
    }, [dispatch]);

    const handleRef = (ref: any) => {
        setHeaderRef(ref);
    };

    return (
        <>
            <Notification />
            <Router>
                {!loading && <NavBar handleRef={handleRef} />}
                <FindMovieModal />
                <Switch>
                    <Route path="/" exact>
                        {loggedUser && !loading && <FilmsPage />}
                        {!loggedUser && !loading && (
                            <section>
                                <MostPopular headerRef={headerRef} />
                                <PopularMovies />
                                <JustReviewed />
                            </section>
                        )}
                    </Route>
                    <Route path="/film/:title" exact>
                        <FilmPage headerRef={headerRef} />
                    </Route>
                    <Route path="/:username/film/:title" exact>
                        <ReviewPage />
                    </Route>
                    <PrivateRoute path="/settings" exact render={() => <SettingsPage />} />
                    <Route path="/people" exact>
                        <PeoplePage />
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
                    <Route path="/:username/diary" exact>
                        <UserDiary />
                    </Route>
                    <Route path="/:username/watchlist" exact>
                        <UserWatchList />
                    </Route>
                    <Route path="/:username/lists" exact>
                        <UserLists />
                    </Route>
                    <Route path="/:username/lists/:listName" exact>
                        <ListPage />
                    </Route>
                    <PrivateRoute exact path="/list/new" render={() => <AddNewListPage />} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
