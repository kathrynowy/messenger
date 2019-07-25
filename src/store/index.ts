import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'


import {usersSaga} from './users/sagas'
import { usersReducer } from './users/reducer'
import { UsersState } from './users/types'
import { DialoguesState } from './dialogues/types';
import { dialoguesSaga } from './dialogues/sagas';
import { DialoguesReducer } from './dialogues/reducer';
import { MessagesState } from './messages/types';
import { MessagesReducer } from './messages/reducer';
import { messagesSaga } from './messages/sagas';



export interface ApplicationState {
  users: UsersState
  router: RouterState
  dialogues: DialoguesState
  messages: MessagesState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    dialogues: DialoguesReducer,
    messages: MessagesReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(usersSaga), fork(dialoguesSaga), fork(messagesSaga)])
}
