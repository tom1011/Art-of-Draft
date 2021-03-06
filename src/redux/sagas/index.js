import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getUserCardSaga from './getUserCardSaga';
import getAdminValues from './getCardAdminSaga';
import postAdminValues from './PostCardAdminSaga';
import putAdminValues from './putCardAdminSaga';
import putDraftAdminValues from './PutDraftAdminValues';
import getAllCardValues from './getAllCardData';
import putAllCardValues from './putALLCardValues';
import userPostCardValues from './UserPostCardDate';
import userPutCardValues from './userPutCardDraftValues';
import draftedCardValues from './draftedCardDefaultValues';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getUserCardSaga(), // gets the user Cards from DB.
    getAdminValues(), // get default card values from DB
    postAdminValues(), // set default card values for admin.
    putAdminValues(), // edits default card values for admin.
    putDraftAdminValues(), // default card values put
    getAllCardValues(), // dynamicly gets info from DB.
    putAllCardValues(), // dynamicly post to DB according to hero selected.
    userPostCardValues(), // post the user card values to DB
    userPutCardValues(), // updates the user card values in DB
    draftedCardValues(), // this should update the value list for cards during drafting.
  ]);
}
