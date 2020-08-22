import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Form from './Form';
import AddFavoriteBtn from './AddFavoriteBtn';
import { setFavorites } from '../../features/user/userSlice';

const SettingsPage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [index, setIndex] = useState<number>(0);
    const dispatch = useDispatch();
    useEffect(() => {
        if (loggedUser) {
            dispatch(setFavorites(loggedUser.favorites));
        }
    }, [dispatch, loggedUser]);
    if (loggedUser) {
        return (
            <section className="settings">
                <h2>Account Settings</h2>
                <div className="container">
                    <Form index={index} />
                    <article className="edit-favorites">
                        <h4 className="h4-subtitle">Favorite Films</h4>
                        <div className="posters">
                            <AddFavoriteBtn index={0} setIndex={setIndex} />
                            <AddFavoriteBtn index={1} setIndex={setIndex} />
                            <AddFavoriteBtn index={2} setIndex={setIndex} />
                            <AddFavoriteBtn index={3} setIndex={setIndex} />
                        </div>
                    </article>
                </div>
            </section>
        );
    }
    return null;
};

export default SettingsPage;
