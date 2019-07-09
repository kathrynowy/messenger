import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'


import {usersSaga} from './users/sagas'
import { usersReducer } from './users/reducer'
import { UsersState } from './users/types'

// The top-level state object
export interface ApplicationState {
  users: UsersState
  router: RouterState
}


export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}


export const createRootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    router: connectRouter(history)
  })


export function* rootSaga() {
  yield all([fork(usersSaga)])
}