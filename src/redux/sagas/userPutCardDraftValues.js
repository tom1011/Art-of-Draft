import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardGetAdminSaga(action) {
    try {
       yield axios({
          method: 'PUT',
          url: '/api/card/userput',
          data: action.payload,
        })
        yield put({type: 'GET_USER_CARDS', payload: {user_id: action.payload.user_id}})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('PUT_USER_CARD_VALUES', cardGetAdminSaga);
  }
  
  export default userSaga;