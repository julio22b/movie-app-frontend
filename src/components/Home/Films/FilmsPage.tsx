import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const FilmsPage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);

    return (
        <section className="friends-reviews">
            <h4 className="h4-subtitle">RECENT REVIEWS BY FRIENDS</h4>
        </section>
    );
};

export default FilmsPage;
