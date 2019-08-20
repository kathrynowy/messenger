import { all, /* call, */ fork, put, takeEvery } from 'redux-saga/effects';
import { fetchError, fetchSuccess } from './actions';
import { UsersActionTypes } from './types';
/* import { callApi } from '../../utils/api' */

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    /* const res = yield call(callApi, 'get', API_ENDPOINT, '/heroStats') */
    const res = [{
      Dialogues : ['5d308fccf3d6a151f00b9bfe'],
      Username: 'Katya',
      UserId: 2,
    }];

    yield put(fetchSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(UsersActionTypes.FETCH_REQUEST, handleFetch);
}

function* usersSaga() {
  yield all([fork(watchFetchRequest)]);
}

export { usersSaga };
