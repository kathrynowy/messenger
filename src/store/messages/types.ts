export interface Message extends ApiResponse {
  id: number
  text: string
  fromId: number
  toId: number
  date: number
}

export type ApiResponse = Record<string, any>

export enum MessagesActionTypes {
  FETCH_REQUEST = '@@messages/FETCH_REQUEST',
  FETCH_SUCCESS = '@@messages/FETCH_SUCCESS',
  FETCH_ERROR = '@@messages/FETCH_ERROR',
  GET_USER = '@@messages/GET_MESSAGE',
}

export interface MessagesState {
  readonly loading: boolean
  readonly data: Message[]
  readonly errors?: string
}
