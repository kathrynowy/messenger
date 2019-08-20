
import { action } from 'typesafe-actions';
import { Chat, ChatsActionTypes } from './types';

export const fetchChats = (actionData: any) => action(ChatsActionTypes.FETCH_CHATS, actionData);

export const fetchSuccess = (data: Chat[]) => action(ChatsActionTypes.FETCH_SUCCESS, data);

export const fetchError = (message: string) => action(ChatsActionTypes.FETCH_ERROR, message);
