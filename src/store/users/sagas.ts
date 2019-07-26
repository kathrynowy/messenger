import { all, /* call, */ fork, put, takeEvery } from 'redux-saga/effects'
import { UsersActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
/* import { callApi } from '../../utils/api' */


function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    /* const res = yield call(callApi, 'get', API_ENDPOINT, '/heroStats') */
    const res = [{
      id: 1,
      name: 'Jane Doe',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK'
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
  yield takeEvery(UsersActionTypes.FETCH_REQUEST, handleFetch)
}

function* usersSaga() {
  yield all([fork(watchFetchRequest)])
}


export { usersSaga }
