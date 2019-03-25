const draftedCardList = (state = [], action) => {
    switch(action.type) {
      case 'DRAFTED_CARD_LIST':
      console.log('drafted card list hit', action.payload)
      console.log('drafted card list hit logging state', action.payload)
      return [...state, action.payload]
      default: 
      return state;
    }
  }

  // this is the admin cards values.
  export default draftedCardList;