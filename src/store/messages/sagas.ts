import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MessagesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import axios from 'axios'
import { AnyAction } from 'redux'
/* import { callApi } from '../../utils/api' */


function* handleFetch(actionData: AnyAction) {
  try {
    console.log('hello from MESSAGES actdata', actionData);
    const { DialogueId } = actionData.payload;
    console.log('hello from saga dialogueId', DialogueId);
    const { data } = yield call(() => axios.get(`http://localhost:8000/message/all?dialogueId=${DialogueId}`)); 
    console.log('hello from saga data', data);
    yield put(fetchSuccess(data))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}


function* watchFetchRequest() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, handleFetch)
}

function* messagesSaga() {
  yield all([fork(watchFetchRequest)])
}


export { messagesSaga }
