import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import usercards from './setCardReducer';
import adminCardValues from './setAdminCardReducer';
import selectedCardValues from './setCardValuesReducer';
import draftedCardList from './draftedCardListreducer';
import draftedCardValues from './DraftCardValues';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  usercards, // set the array of cards.
  adminCardValues, // gets the default admin card values from DB
  selectedCardValues, // gets the selected card information from admin table.
  draftedCardList, // this will store the current drafted card list.
  draftedCardValues, // this is the entire list of cards data with the users changes added to (the default and then when drafting)
});

export default rootReducer;
