import axios from 'axios';
import { userLogInInput } from '../features/types';

const baseUrl = 'http://localhost:3001/api/users';

async function logIn(user: userLogInInput) {
    const response = await axios.post(`${baseUrl}/log-in`, user);
    localStorage.setItem('filmlyCurrentUser', JSON.stringify(response.data));
    return response.data;
}

function logOut() {
    localStorage.removeItem('filmlyCurrentUser');
}

interface userSignUpInput extends userLogInInput {
    password_confirmation: string;
}

async function signUp(user: userSignUpInput) {
    const response = await axios.post(`${baseUrl}/sign-up`, user);
    return response.data;
}

export default {
    logIn,
    logOut,
    signUp,
};
