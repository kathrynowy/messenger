import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { DialoguesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions';
import axios from 'axios';
import { AnyAction } from 'redux';
/* import { callApi } from '../../utils/api' */


function* handleFetch(actionData: AnyAction) {
  try {
    // To call async functions, use redux-saga's `call()`.
    console.log('hello from saga actdata', actionData);
    const { userId } = actionData.payload;
    console.log('hello from saga, id', userId);
    const { data } = yield call(() => axios.get(`http://localhost:8000/dialogue/all?userId=${userId}`)); 
    console.log('hello from saga, data', data);
   /*  if (res.error) {
      yield put(fetchError(res.error))
    } else { */
      yield put(fetchSuccess(data));
    /* } */
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}


function *watchFetchRequest() {
  yield takeEvery(DialoguesActionTypes.FETCH_DIALOGUES, handleFetch)
}

function* dialoguesSaga() {
  yield all([fork(watchFetchRequest)])
}


export { dialoguesSaga }
