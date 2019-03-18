import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* cardGetSaga() {
  try {
    const cardInfo = yield axios({
        method: 'GET',
        url: '/api/admin'
      })
      yield put({type: 'SET_CARD_ADMIN', payload: cardInfo.data})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('GET_ADMIN_VALUES', cardGetSaga);
}

export default userSaga;