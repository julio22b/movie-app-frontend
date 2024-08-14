import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMovieForReview } from '../../features/movies/popularMoviesSlice';

interface props {
    handleModalState: any;
}

const CloseModalBtn: React.FC<props> = ({ handleModalState }) => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(handleModalState());
        dispatch(removeMovieForReview());
    };
    return <button onClick={close}>X</button>;
};

export default CloseModalBtn;
