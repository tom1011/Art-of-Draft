import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardGetAdminSaga(action) {
    try {
       yield axios({
          method: 'PUT',
          url: '/api/admin/draft',
          data: action.payload,
        })
        yield put({type: 'GET_ADMIN_VALUES'})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  // draft is default card values not dynamic changing.
  
  function* userSaga() {
    yield takeLatest('PUT_CARD_DRAFT_ADMIN', cardGetAdminSaga);
  }
  
  export default userSaga;