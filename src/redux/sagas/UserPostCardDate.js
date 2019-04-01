import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardGetAdminSaga(action) {
    try {
       yield axios({
          method: 'POST',
          url: '/api/card/userpost',
          data: action.payload,
        })
        yield put({type: 'GET_USER_CARDS', payload: {user_id: action.payload.user_id}})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('POST_USER_CARD_VALES', cardGetAdminSaga);
  }
  
  export default userSaga;