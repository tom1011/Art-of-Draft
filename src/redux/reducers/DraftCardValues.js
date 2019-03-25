const draftedCardValues = (state = [], action) => {
    switch (action.type) {
        case 'DRAFTED_CARD_VALUES_DEFAULT':
            // admin default cards, user are the user changed cards.
            console.log(' drafted card values was hit logging action.payload', action.payload)
            let masterArray = action.payload.admin
            for (let i = 0; i < action.payload.user.length; i++) {
                console.log('in first for loop')
                if (action.payload.user[i].is_default)// the user changed a default value so it will now run to next step
                    for (let j = 0; j < masterArray.length; j++) {
                        if (action.payload.user[i].card_id === masterArray[j].card_id){
                            masterArray[j].default_value = action.payload.user[i].user_card_value
                            console.log (action.payload.user[i].card_id, 'logging two above', masterArray[j].card_id)
                        }

            }
        }
            return masterArray

        case 'DRAFTED_CARD_VALUES':


            return state
        case 'DRAFTED_CARD_VALUES_CLEAR':
            return []
        default:
            return state;
    }
}

// this is the admin cards values.
export default draftedCardValues;