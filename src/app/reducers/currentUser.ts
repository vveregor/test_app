import {ActionType, createReducer} from 'typesafe-actions';
import {TUser} from '../API';
import {fetchUserAsync, likeUserAsync} from '../asyncActions/users';
import {clearCurrentUser} from '../actions/users';

type TCurrentUserState = {
    data: TUser | null;
    status: string;
};

const initialState: TCurrentUserState = {
    data: null,
    status: 'loading',
};

export type TCurrentUserActions = ActionType<
    | typeof fetchUserAsync.request
    | typeof fetchUserAsync.success
    | typeof clearCurrentUser
    | typeof likeUserAsync.success
>;

export const currentUserReducer = createReducer<TCurrentUserState, TCurrentUserActions>(initialState)
    .handleAction(fetchUserAsync.request, state => ({...state, status: 'loading', data: null}))
    .handleAction(fetchUserAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        data: action.payload.user,
    }))
    .handleAction(clearCurrentUser, state => ({...state, status: 'loading', data: null}));
