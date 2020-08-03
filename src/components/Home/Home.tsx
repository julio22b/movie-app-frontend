import React, { useEffect } from 'react';
import PopularMovies from './PopularMovies';
import MostPopular from './MostPopular';
import JustReviewed from './JustReviewed';
import FindMovieModal from './FindMovieModal';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import FilmPage from '../Film/FilmPage';

const Home = () => {
    return (
        <>
            <FindMovieModal />
            <Router>
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
                </Switch>
            </Router>
        </>
    );
};

export default Home;
