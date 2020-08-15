import React from 'react';

const UserData: React.FC<{ classname: string; amount: number }> = ({ classname, amount }) => {
    return (
        <div className={classname}>
            <i></i>
            {amount}
        </div>
    );
};

export default UserData;
