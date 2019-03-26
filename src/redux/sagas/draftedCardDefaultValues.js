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
        console.log('logging cardinfo in get admin cards', cardInfo)
        yield putResolve({ type: 'SET_CARD_ADMIN', payload: cardInfo.data })
        console.log('in saga Drafted Card Default Values. action.payload', action.payload)
        const userInfo = yield axios({
            method: 'POST',
            url: '/api/card/userget',
            data: action.payload
        })
        console.log('logging the post to get the current user card list', userInfo.data)
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
        console.log('logging the post to get the current user card list', action.payload.adminCardValues)
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