import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardpostDraftAdminSaga(action) {
    try {
    yield console.log('admin put saga', action.payload)
       yield axios({
          method: 'PUT',
          url: '/api/admin/all',
          data: action.payload,
        })
        yield put({type: 'GET_CARD_VALUE_ADMIN'})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('PUT_ALL_CARD_ADMIN', cardpostDraftAdminSaga);
  }
  
  export default userSaga;