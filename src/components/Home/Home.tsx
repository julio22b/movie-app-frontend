import React from 'react';
import PopularMovies from './PopularMovies';
import MostPopular from './MostPopular';
import JustReviewed from './JustReviewed';
import LogMovieModal from '../Header/LogMovieModal';

const Home = () => {
    return (
        <section>
            <p>Track films you've watched</p>
            <p>Save those you want to see</p>
            <p>Tell your friends what's good</p>
            <MostPopular />
            <LogMovieModal />
            <PopularMovies />
            <JustReviewed />
        </section>
    );
};

export default Home;
