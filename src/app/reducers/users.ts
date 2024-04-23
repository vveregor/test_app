import {ActionType, createReducer} from 'typesafe-actions';
import {removeUser} from '../actions/users';
import {TUser} from '../API';
import {fetchUsersAsync, likeUserAsync} from '../asyncActions/users';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    status: string;
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    status: 'loading',
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
    | typeof likeUserAsync.request
    | typeof likeUserAsync.success
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(fetchUsersAsync.request, state => ({...state, status: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        status: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }))
    .handleAction(likeUserAsync.success, (state, action) => ({
        ...state,
        items: state.items.map(item => ({
            ...item,
            like: item.id === action.payload.userId ? !item?.like : !!item?.like,
        })),
    }));
