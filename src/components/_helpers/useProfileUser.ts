import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getProfilePage, getProfilePageByUsername } from '../../features/user/userSlice';

export interface LocationState {
    userID: string;
}

/**
 * Resolves the profile a page is displaying.
 */
export function useProfileUser() {
    const { state } = useLocation<Partial<LocationState> | undefined>();
    const { username } = useParams<{ username?: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { user, loading, error } = useSelector((s: RootState) => s.userAuth.user_for_profile_page);

    const userID = state?.userID;

    useEffect(() => {
        if (userID) {
            dispatch(getProfilePage(userID));
        } else if (username) {
            dispatch(getProfilePageByUsername(username));
        }
    }, [dispatch, userID, username]);

    return { user, loading, error };
}
