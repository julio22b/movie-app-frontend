import React from 'react';
import { useDispatch } from 'react-redux';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import { removeMovieForReview } from '../../features/movies/popularMoviesSlice';

const CloseModalBtn = () => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(changeModalState());
        dispatch(removeMovieForReview());
    };
    return <button onClick={close}>X</button>;
};

export default CloseModalBtn;
