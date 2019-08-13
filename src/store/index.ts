import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { DialoguesReducer } from './dialogues/reducer';
import { dialoguesSaga } from './dialogues/sagas';
import { DialoguesState } from './dialogues/types';
import { MessagesReducer } from './messages/reducer';
import { messagesSaga } from './messages/sagas';
import { MessagesState } from './messages/types';
import { usersReducer } from './users/reducer';
import {usersSaga} from './users/sagas';
import { UsersState } from './users/types';

export interface ApplicationState {
  users: UsersState;
  router: RouterState;
  dialogues: DialoguesState;
  messages: MessagesState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    dialogues: DialoguesReducer,
    messages: MessagesReducer,
    router: connectRouter(history),
    users: usersReducer,
  });

export function* rootSaga() {
  yield all([fork(usersSaga), fork(dialoguesSaga), fork(messagesSaga)]);
}
