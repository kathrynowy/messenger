import { action } from 'typesafe-actions';
import { User, UsersActionTypes } from './types';

export const signIn = (user: any) => action(UsersActionTypes.SIGN_IN, user);

export const signInSuccess = (data: any) => action(UsersActionTypes.SIGN_IN_SUCCESS, data);

export const signUp = (user: any) => action(UsersActionTypes.SIGN_UP, user);

export const fetchSuccess = (data: User[]) => action(UsersActionTypes.FETCH_SUCCESS, data);

export const fetchError = (message: string) => action(UsersActionTypes.FETCH_ERROR, message);

export const getUsers = () => action(UsersActionTypes.GET_USERS);
