
import { action } from 'typesafe-actions'
import { MessagesActionTypes, Message } from './types'


export const fetchRequest = () => action(MessagesActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: Message[]) => action(MessagesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(MessagesActionTypes.FETCH_ERROR, message)
