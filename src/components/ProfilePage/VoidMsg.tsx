import React from 'react';

interface props {
    userID: string | undefined;
    loggedUserID: string | undefined;
    username: string;
    text: string;
}

const VoidMsg: React.FC<props> = ({ userID, loggedUserID, username, text }) => {
    if (userID === loggedUserID) {
        return <p className="void-msg">You don't have {text}.</p>;
    }
    return (
        <p className="void-msg">
            {username} doesn't have {text}.
        </p>
    );
};

export default VoidMsg;
