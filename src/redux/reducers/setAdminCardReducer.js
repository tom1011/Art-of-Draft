const cardInfo = (state = [], action) => {
    switch(action.type) {
      case 'SET_CARD_ADMIN':
      return action.payload
      default: 
      return state;
    }
  }

  export default cardInfo;