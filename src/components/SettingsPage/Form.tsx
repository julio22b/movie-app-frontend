import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import userService from '../../services/userService';
import { notify } from '../../services/helpers';
import SearchFavorite from './SearchFavorite';

const Form: React.FC<{ index: number }> = ({ index }) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const { favorites } = useSelector(
        (state: RootState) => state.userAuth.form_status.favorites_form,
    );
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    useEffect(() => {
        if (loggedUser) {
            setUsername(loggedUser?.username);
            setBio(loggedUser?.bio);
        }
    }, [loggedUser]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loggedUser) {
            try {
                const favoriteIDS = favorites.map((f) => f?._id || null);
                const data = await userService.editProfile(loggedUser?._id, {
                    username,
                    bio,
                    favorites: favoriteIDS,
                });
                notify({ message: data.message, type: 'success' }, dispatch);
            } catch (e) {
                notify({ message: 'Something went wrong', type: 'warning' }, dispatch);
            }
        }
    };

    return (
        <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <SearchFavorite index={index} />
            <label htmlFor="username">
                Username <span>(also changes your log in username)</span>
            </label>
            <input
                type="text"
                name="username"
                required
                minLength={3}
                maxLength={25}
                defaultValue={loggedUser?.username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="bio">Bio</label>
            <textarea
                name="bio"
                cols={30}
                rows={10}
                defaultValue={loggedUser?.bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
            ></textarea>
            <button className="green-btn">SAVE CHANGES</button>
        </form>
    );
};

export default Form;
