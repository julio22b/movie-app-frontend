import React from 'react';

const SignInBtn: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="sign-in-btn">
            <button>{text}</button>
        </div>
    );
};

export default SignInBtn;
