import React from 'react';
import PopularMovies from './PopularMovies';
import MostPopular from './MostPopular';
import JustReviewed from './JustReviewed';
import FindMovieModal from './FindMovieModal';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import FilmPage from '../Film/FilmPage';
import Notification from './Notification';
import { NavBar } from '../Header/NavBar';
import ReviewPage from '../ReviewPage/ReviewPage';

const Home = () => {
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
                </Switch>
            </Router>
        </>
    );
};

export default Home;
