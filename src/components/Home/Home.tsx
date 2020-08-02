import React from 'react';
import PopularMovies from './PopularMovies';
import MostPopular from './MostPopular';
import JustReviewed from './JustReviewed';
import FindMovieModal from './FindMovieModal';

const Home = () => {
    return (
        <>
            <FindMovieModal />
            <section>
                <MostPopular />
                <PopularMovies />
                <JustReviewed />
            </section>
        </>
    );
};

export default Home;
