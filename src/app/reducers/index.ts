import {combineReducers} from 'redux';
import {usersReducer} from './users';
import {currentUserReducer} from './currentUser';

export const reducers = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
});
