import axios from 'axios';
import { putResolve, takeLatest } from 'redux-saga/effects';

// the first four yileds for both are all duplite code. see below for what I tryed before forceing it.
// tryed promise.all(), promise.resolve, putResolve,
function* draftedDefault(action) {
    try {
        const cardInfo = yield axios({
            method: 'GET',
            url: '/api/admin/default'
        })
        yield putResolve({ type: 'SET_CARD_ADMIN', payload: cardInfo.data })
        const userInfo = yield axios({
            method: 'POST',
            url: '/api/card/userget',
            data: action.payload
        })
        yield putResolve({ type: 'SET_USER_CARD_INFO', payload: userInfo.data })
        yield putResolve({
            type: 'DRAFTED_CARD_VALUES_DEFAULT', payload: {
                user: userInfo.data,
                admin: cardInfo.data
            }
        })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* draftedUpdate(action) {
    try {
        // first one will be 
        const cardInfo = yield axios({
            method: 'POST',
            url: '/api/admin/all',
            data: action.payload.adminCardValues,
          })
          yield putResolve({type: 'SET_CARD_VALUE_ADMIN', payload: cardInfo.data})
        const userInfo = yield axios({
            method: 'POST',
            url: '/api/card/userget',
            data: action.payload.userId
        })
        yield putResolve({ type: 'SET_USER_CARD_INFO', payload: userInfo.data })
        yield putResolve({type: 'DRAFTED_CARD_VALUES', payload: {user: userInfo.data,
             adminValues: cardInfo.data,
              cardname: action.payload.adminCardValues.cardname,
            cardId: action.payload.adminCardValues.card_id}})
    }
    catch (error) {
        console.log('User get request failed', error);
    }
}


function* userSaga() {
    yield takeLatest('DRAFTED_CARD_VALUES_DEFAULT_SAGA', draftedDefault);
    yield takeLatest('DRAFTED_CARD_VALUES_DRAFTED_CARD', draftedUpdate);
}

export default userSaga;