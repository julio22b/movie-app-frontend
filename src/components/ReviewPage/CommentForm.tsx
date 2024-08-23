import React, { useState } from 'react';
import { reviewService } from '../../services/reviewService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { User, ReviewComment } from '../../features/types';
import { notify } from '../../services/helpers';
import { AxiosError } from 'axios';

interface props {
    reviewID: string | undefined;
    setComments: React.Dispatch<React.SetStateAction<ReviewComment[] | null>>;
}

const CommentForm: React.FC<props> = ({ reviewID, setComments }) => {
    const [content, setContent] = useState('');
    const loggedUser = useSelector((state: RootState) => state.userAuth.user) as User;
    const dispatch = useDispatch();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await reviewService.postComment(
                loggedUser._id as string,
                reviewID as string,
                content,
            );
            setContent('');
            setComments((prev) => prev?.concat(data.comment) as ReviewComment[]);
            notify({ message: data.message, type: 'success' }, dispatch);
        } catch (e) {
            if(e instanceof AxiosError)
                notify({ message: e.response?.data.message, type: 'warning' }, dispatch);
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
                value={content}
                required
            ></textarea>
            <button className="green-btn">POST</button>
        </form>
    );
};

export default CommentForm;
