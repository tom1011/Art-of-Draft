import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* cardpostDraftAdminSaga(action) {
    try {
       yield axios({
          method: 'PUT',
          url: '/api/admin/alls',
          data: action.payload,
        })
        yield put({type: 'GET_CARD_VALUE_ADMIN', payload: {cardname: action.payload.parentCardName}})
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  function* userSaga() {
    yield takeLatest('PUT_ALL_CARD_ADMIN', cardpostDraftAdminSaga);
  }
  
  export default userSaga;