import {createAction} from 'typesafe-actions';

export const removeUser = createAction('REMOVE_USER')<number>();

export const clearCurrentUser = createAction('CLEAR_CURRENT_USER')();
