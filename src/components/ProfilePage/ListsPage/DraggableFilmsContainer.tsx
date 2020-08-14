import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import DraggableFilm from './DraggableFilm';

const DraggableFilmsContainer = () => {
    const { movies } = useSelector((state: RootState) => state.userAuth.form_status.new_list_form);
    if (!movies.length) {
        return (
            <div className="movies-container empty">
                <h3>Your list is empty</h3>
                <p>Add films using the field above.</p>
            </div>
        );
    }
    return (
        <div className="movies-container">
            {movies.length > 0 &&
                movies.map((movie) => <DraggableFilm movie={movie} key={movie._id} />)}
        </div>
    );
};

export default DraggableFilmsContainer;
