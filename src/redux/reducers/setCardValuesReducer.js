const cardInfo = (state = [], action) => {
    switch(action.type) {
      case 'SET_CARD_VALUE_ADMIN':
      return action.payload
      default: 
      return state;
    }
  }

  // this is the admin cards values.
  export default cardInfo;