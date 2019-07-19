import { all, /* call, */ fork, put, takeEvery } from 'redux-saga/effects'
import { MessagesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
/* import { callApi } from '../../utils/api' */


function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
   /*  const { data } = yield call(() => axios.get('http:/localhost:8000/message/'))); */
    const res = [{
      id: 1,
      text: 'Jane Dgfdgdfgdfgoe',
      fromId: 1,
      toId: 2,
      date: 416516164
    }]

   /*  if (res.error) {
      yield put(fetchError(res.error))
    } else { */
      yield put(fetchSuccess(res))
    /* } */
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}


function* watchFetchRequest() {
  yield takeEvery(MessagesActionTypes.FETCH_REQUEST, handleFetch)
}

function* messagesSaga() {
  yield all([fork(watchFetchRequest)])
}


export { messagesSaga }
