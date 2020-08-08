import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Form from './Form';
import AddFavoriteBtn from './AddFavoriteBtn';

const SettingsPage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);

    return (
        <section className="settings">
            <h2>Account Settings</h2>
            <div className="container">
                <Form />
                <article className="edit-favorites">
                    <h4 className="h4-subtitle">
                        Favorite Films <span>Drag posters to reorder.</span>
                    </h4>
                    <div className="posters">
                        <AddFavoriteBtn />
                        <AddFavoriteBtn />
                        <AddFavoriteBtn />
                        <AddFavoriteBtn />
                    </div>
                </article>
            </div>
        </section>
    );
};

export default SettingsPage;
