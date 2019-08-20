import { all, /* call, */ fork, put, takeEvery } from 'redux-saga/effects';
import { fetchError, fetchSuccess } from './actions';
import { UsersActionTypes } from './types';
/* import { callApi } from '../../utils/api' */

function* handleFetch() {
  try {
    const res = [{
      chats : ['5d308fccf3d6a151f00b9bfe'],
      userId: 2,
      username: 'Katya',
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
