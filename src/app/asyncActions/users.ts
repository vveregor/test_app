import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {createAsyncAction} from 'typesafe-actions';

import {fetchUser, fetchUsers, likeUser, TUser, TUsers} from '../API';
import {RootState} from '../store';

export const fetchUsersAsync = createAsyncAction('FETCH_USERS_REQUEST', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_FAILURE')<
    undefined,
    {users: TUsers; length: number}
>();

export const fetchUsersThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await fetchUsers();
    dispatch(fetchUsersAsync.success({users: response.data, length: response.length}));
};

export const fetchUserAsync = createAsyncAction('FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE')<
    number,
    {user: TUser | null}
>();

export const fetchUserThunk =
    (userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        const response = await fetchUser(userId);
        dispatch(fetchUserAsync.success({user: response.data || null}));
    };

export const likeUserAsync = createAsyncAction('LIKE_USER_REQUEST', 'LIKE_USER_SUCCESS', 'LIKE_USER_FAILURE')<
    number,
    {userId: number}
>();

export const likeUserThunk =
    (userId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        const response = await likeUser(userId);
        dispatch(likeUserAsync.success({userId: response.userId}));
    };
