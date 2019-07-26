
import { action } from 'typesafe-actions'
import { DialoguesActionTypes, Dialogue } from './types'


export const fetchDialogues = (actionData: any) => action(DialoguesActionTypes.FETCH_DIALOGUES, actionData)

export const fetchSuccess = (data: Dialogue[]) => action(DialoguesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(DialoguesActionTypes.FETCH_ERROR, message)
