import axios from 'axios';
import { userLogInInput } from '../features/types';
import authHeader from './authHeader';
import Axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/users`;

async function logIn(user: userLogInInput) {
    const response = await axios.post(`${baseUrl}/log-in`, user);
    localStorage.setItem('filmlyCurrentUser', JSON.stringify(response.data));
    return response.data;
}

async function getUserInfo(id: string) {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

function removeCurrentUser() {
    localStorage.removeItem('filmlyCurrentUser');
}

interface userSignUpInput extends userLogInInput {
    password_confirmation: string;
}

async function signUp(user: userSignUpInput) {
    const response = await axios.post(`${baseUrl}/sign-up`, user);
    return response.data;
}

const changeWatchedStatus = async (
    userID: string | undefined,
    movieID: string | undefined,
    action: 'add-to-diary' | 'remove-from-diary',
) => {
    const response = await Axios.put(`${baseUrl}/${userID}/${action}/${movieID}`, null, {
        headers: authHeader(),
    });
    return response.data;
};

const changeWatchListStatus = async (
    userID: string | undefined,
    movieID: string | undefined,
    action: 'add-to-watchlist' | 'remove-from-watchlist',
) => {
    const response = await Axios.put(`${baseUrl}/${userID}/${action}/${movieID}`, null, {
        headers: authHeader(),
    });
    return response.data;
};

interface ProfileData {
    username: string;
    profile_picture: string | null | ArrayBuffer;
    bio: string;
    favorites: Array<string | null>;
}

const editProfile = async (userID: string | undefined, data: ProfileData) => {
    const response = await Axios.put(`${baseUrl}/${userID}`, data, { headers: authHeader() });
    return response.data;
};

const follow = async (loggedUserID: string, userToFollowID: string) => {
    const response = await Axios.put(`${baseUrl}/${loggedUserID}/follow/${userToFollowID}`, null, {
        headers: authHeader(),
    });
    return response.data;
};

const unfollow = async (loggedUserID: string, userToFollowID: string) => {
    const response = await Axios.put(
        `${baseUrl}/${loggedUserID}/unfollow/${userToFollowID}`,
        null,
        { headers: authHeader() },
    );
    return response.data;
};

const getAll = async () => {
    const response = await Axios.get(`${baseUrl}/all`);
    return response.data;
};

export const userService = {
    logIn,
    removeCurrentUser,
    signUp,
    getUserInfo,
    changeWatchListStatus,
    changeWatchedStatus,
    editProfile,
    getAll,
    follow,
    unfollow,
};
