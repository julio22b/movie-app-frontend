import React, { useState } from 'react';
import reviewService from '../../services/reviewService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../features/types';
import { showNotification } from '../../features/user/userSlice';

const CommentForm: React.FC<{ reviewID: string | undefined }> = ({ reviewID }) => {
    const [content, setContent] = useState('');
    const loggedUser = useSelector((state: RootState) => state.userAuth.user) as User;
    const dispatch = useDispatch();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const message = await reviewService.postComment(
                loggedUser._id as string,
                reviewID as string,
                content,
            );
            setContent('');
            dispatch(showNotification({ message, type: 'success' }));
        } catch (e) {
            dispatch(showNotification({ message: e, type: 'warning' }));
        }
    };
    return (
        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
            <h4 className="h4-subtitle">COMMENT?</h4>
            <textarea
                name="content"
                cols={30}
                rows={3}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button className="green-btn">POST</button>
        </form>
    );
};

export default CommentForm;
