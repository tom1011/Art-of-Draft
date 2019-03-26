import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* cardGetSaga() {
  try {
    console.log('in get admin cards')
    const cardInfo = yield axios({
        method: 'GET',
        url: '/api/admin/default'
      })
      console.log('logging cardinfo in get admin cards', cardInfo)
      yield put({type: 'SET_CARD_ADMIN', payload: cardInfo.data})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('GET_ADMIN_VALUES', cardGetSaga);
}

export default userSaga;