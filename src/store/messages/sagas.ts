import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MessagesActionTypes } from './types'
import { fetchError, fetchSuccess, sendSuccess } from './actions'
import axios from 'axios'
import { AnyAction } from 'redux'
import { func } from 'prop-types';
/* import { callApi } from '../../utils/api' */


function* handleFetch(actionData: AnyAction) {
  try {
    const { DialogueId } = actionData.payload;
    const { data } = yield call(() => axios.get(`http://localhost:8000/message/all?dialogueId=${DialogueId}`));
    yield put(fetchSuccess(data))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* sendMessage(actionData: AnyAction) {
  try {
    const { dialogueId, text, userId } = actionData.payload;
    const time = new Date().getTime();
    console.log('dialogueId ', dialogueId, 'text ', text, 'userId ', userId, 'time ', time);
    const { data } = yield call(() =>
      axios.post("http://localhost:8000/message/add", {
        Dialogue: dialogueId,
        Text: text,
        User: userId,
        Time: time
      }
    ));

    console.log('data message', data);

    yield put(sendSuccess(data))
  } catch (err) {
    yield put(fetchError(err.stack!))
  }

}


function* watchFetchRequest() {
  yield takeEvery(MessagesActionTypes.FETCH_MESSAGES, handleFetch)
}

function* watchMessageSending() {
  yield takeEvery(MessagesActionTypes.SEND_MESSAGE, sendMessage)
}

function* messagesSaga() {
  yield all([fork(watchFetchRequest), fork(watchMessageSending)])
}


export { messagesSaga }
