import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardpostDraftAdminSaga(action) {
    try {
       yield axios({
          method: 'PUT',
          url: '/api/admin/default',
          data: action.payload,
        })
        yield put({type: 'GET_ADMIN_VALUES'})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('PUT_CARD_ADMIN', cardpostDraftAdminSaga);
  }
  
  export default userSaga;