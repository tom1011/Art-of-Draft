const draftedCardList = (state = [], action) => {
    switch(action.type) {
      case 'DRAFTED_CARD_LIST':
      return [...state, action.payload]
      case 'DRAFTED_CARD_LIST_CLEAR':
      return []
      default: 
      return state;
    }
  }

  // this is the admin cards values.
  export default draftedCardList;