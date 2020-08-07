import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSignInFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';

const SignInBtn: React.FC<{ text: string }> = ({ text }) => {
    const { sign_in_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();
    const openForm = () => {
        dispatch(changeSignInFormStatus(!sign_in_form));
        window.scrollTo(0, 0);
    };
    return (
        <div className="sign-in-btn">
            <button type="button" onClick={openForm}>
                {text}
            </button>
        </div>
    );
};

export default SignInBtn;
