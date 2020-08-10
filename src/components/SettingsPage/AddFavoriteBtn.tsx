import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { changePickFavoriteFormStatus, removeFavorite } from '../../features/user/userSlice';

interface props {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AddFavoriteBtn: React.FC<props> = ({ index, setIndex }) => {
    const { open } = useSelector((state: RootState) => state.userAuth.form_status.favorites_form);
    const { favorites } = useSelector(
        (state: RootState) => state.userAuth.form_status.favorites_form,
    );
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(changePickFavoriteFormStatus(!open));
        setIndex(index);
    };

    return (
        <div className="add">
            {!favorites[index] ? (
                <>
                    <div className="placeholder" onClick={handleClick}>
                        {' '}
                        <button className="gray-btn">+</button>
                    </div>
                </>
            ) : (
                <button className="gray-btn remove" onClick={() => dispatch(removeFavorite(index))}>
                    x
                </button>
            )}
            <img src={favorites[index]?.poster.replace(/&#x2F;/g, '/') || ''} alt="" />
        </div>
    );
};

export default AddFavoriteBtn;
