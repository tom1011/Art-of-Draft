import axios from 'axios';
import { putResolve, takeLatest } from 'redux-saga/effects';

// this will get the user table.
function* cardGetSaga(action) {
  try {
    const cardInfo = yield axios({
        method: 'POST',
        url: '/api/card/userget',
        data: action.payload
      })
      yield putResolve({type: 'SET_USER_CARD_INFO', payload: cardInfo.data})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('GET_USER_CARDS', cardGetSaga);
}

export default userSaga;