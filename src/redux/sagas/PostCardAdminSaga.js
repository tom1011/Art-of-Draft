import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardGetAdminSaga(action) {
    try {
       yield axios({
          method: 'POST',
          url: '/api/admin/default',
          data: action.payload,
        })
        yield put({type: 'GET_ADMIN_VALUES'})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('POST_CARD_ADMIN', cardGetAdminSaga);
  }
  
  export default userSaga;