const cardInfo = (state = [], action) => {
    switch(action.type) {
      case 'SET_USER_CARD_INFO':// this will grab the users info
      return action.payload
      default: 
      return state;
    }
  }

  export default cardInfo;