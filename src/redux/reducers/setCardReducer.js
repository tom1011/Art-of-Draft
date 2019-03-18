const cardInfo = (state = [], action) => {
    console.log('in shelfinfo reducer.')
    switch(action.type) {
      case 'SET_CARD_INFO':
      return action.payload
      default: 
      return state;
    }
  }

  export default cardInfo;