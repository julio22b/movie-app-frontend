import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { userService } from '../../services/userService';
import { notify } from '../../services/helpers';
import SearchFavorite from './SearchFavorite';

import defaultAvatar from '../../images/avatar.webp';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import { favorite } from '../../features/user/userSlice';

const Form: React.FC<{ index: number }> = ({ index }) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const { favorites } = useSelector(
        (state: RootState) => state.userAuth.form_status.favorites_form,
    );
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>(loggedUser?.username || '');
    const [bio, setBio] = useState<string>(loggedUser?.bio || '');
    const [profile_picture, setProfile_picture] = useState<ArrayBuffer | null | string>('');
    const [saveBtnText, setSaveBtnText] = useState('SAVE CHANGES');
    useEffect(() => {
        if (loggedUser) {
            setUsername(loggedUser.username);
            setBio(loggedUser.bio);
            setProfile_picture(loggedUser.profile_picture);
        }
    }, [loggedUser]);
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loggedUser) {
            try {
                const favoriteIDS = favorites.map((favorite: favorite) => favorite?._id || null);
                setSaveBtnText('SAVING...');
                const { message } = await userService.editProfile(loggedUser?._id, {
                    username,
                    profile_picture,
                    bio,
                    favorites: favoriteIDS,
                });
                notify({ message: message, type: 'success' }, dispatch);
                history.go(0);
            } catch (e) {
                if(e instanceof AxiosError){
                    notify({ message: e.response?.data.message, type: 'warning' }, dispatch);
                    setSaveBtnText('SAVE CHANGES');
                }
            }
        }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e && e.target && e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = () => setProfile_picture(reader.result);
    };

    return (
        <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <SearchFavorite index={index} />
            <div className="image-wrapper">
                <input
                    type="file"
                    onChange={(e) => handleFile(e)}
                    defaultValue={profile_picture as string}
                />
                <img
                    className="profile-picture"
                    src={(profile_picture as string) || defaultAvatar}
                    alt=""
                />
                <button className="green-btn" type="button">
                    SELECT NEW AVATAR
                </button>
            </div>
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
                defaultValue={bio ? bio.replace(/&#x27;/g, `'`) : ''}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
            ></textarea>
            <button className="green-btn">{saveBtnText}</button>
        </form>
    );
};

export default Form;
