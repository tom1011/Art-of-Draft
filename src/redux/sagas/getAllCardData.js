import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardGetSaga(action) {
  try {
    yield console.log('in saga get all card data admin logging action.payload', action.payload)
    const cardInfo = yield axios({
        method: 'POST',
        url: '/api/admin/all',
        data: action.payload,
      })
      yield put({type: 'SET_CARD_VALUE_ADMIN', payload: cardInfo.data})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('GET_CARD_VALUE_ADMIN', cardGetSaga);
}

export default userSaga;