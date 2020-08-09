import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { changePickFavoriteFormStatus } from '../../features/user/userSlice';

const AddFavoriteBtn = () => {
    const { pick_favorite } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();
    return (
        <div className="add" onClick={() => dispatch(changePickFavoriteFormStatus(!pick_favorite))}>
            <button className="gray-btn">+</button>
        </div>
    );
};

export default AddFavoriteBtn;
