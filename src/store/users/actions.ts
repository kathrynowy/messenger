
import { action } from 'typesafe-actions';
import { User, UsersActionTypes } from './types';

export const fetchRequest = () => action(UsersActionTypes.FETCH_REQUEST);

export const fetchSuccess = (data: User[]) => action(UsersActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(UsersActionTypes.FETCH_ERROR, message);
