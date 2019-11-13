import { action } from 'typesafe-actions';
import { Message, MessagesActionTypes } from './types';

export const fetchMessages = (actionData: any) => action(MessagesActionTypes.FETCH_MESSAGES, actionData);

export const sendMessage = (actionData: any) => action(MessagesActionTypes.SEND_MESSAGE, actionData);

export const fetchSuccess = (data: Message[]) => action(MessagesActionTypes.FETCH_SUCCESS, data);

export const sendToNewChatSuccess = (data: Message) => action(MessagesActionTypes.SEND_TO_NEW_CHAT_SUCCESS, data);

export const sendSuccess = (data: Message) => action(MessagesActionTypes.SEND_SUCCESS, data);

export const clearMessages = () => action(MessagesActionTypes.CLEAR_MESSAGES);

export const fetchError = (message: string) => action(MessagesActionTypes.FETCH_ERROR, message);
