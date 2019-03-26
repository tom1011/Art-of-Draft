const draftedCardValues = (state = [], action) => {
    switch (action.type) {
        case 'DRAFTED_CARD_VALUES_DEFAULT':
            // admin default cards, user are the user changed cards.
            console.log(' drafted card values was hit logging action.payload', action.payload)
            let masterArray = action.payload.admin

            for (let i = 0; i < action.payload.user.length; i++) {
                console.log('in first for loop')
                if (action.payload.user[i].is_default) {// the user changed a default value so it will now run to next step
                    for (let j = 0; j < masterArray.length; j++) {
                        if (action.payload.user[i].card_id === masterArray[j].card_id) {
                            masterArray[j].default_value = action.payload.user[i].user_card_value
                            console.log(action.payload.user[i].card_id, 'logging two above', masterArray[j].card_id)
                        }
                    }
                }
            }
            return masterArray

        case 'DRAFTED_CARD_VALUES':
            console.log('in drafted card values logging action.payload', action.payload)
            let cardname = action.payload.cardname.toLowerCase().split(' ').join('_')
            masterArray = state
             let modifiyed = false
            for (let j = 0; j < masterArray.length; j++) {
                modifiyed = false
                for (let i = 0; i < action.payload.user.length; i++) {

                    if (!action.payload.user[i].is_default && action.payload.user[i].card_id === masterArray[j].card_id) {
                            masterArray[j].default_value =  Number(masterArray[j].default_value) + Number(action.payload.user[i].user_card_value)
                            modifiyed = true
                    }

                }
                // note I dont have another for loop here since master Array and admin Values should be lined up.
                if (!modifiyed) {
                    console.log('in !modifiyed area. logging default values', action.payload.adminValues[j], 'cardname:', cardname,
                     'now action.payload.admin.kanna', action.payload.adminValues[j].kanna, 'looging comnined', action.payload.adminValues[j][cardname])
                    masterArray[j].default_value =  Number(masterArray[j].default_value) + Number(action.payload.adminValues[j][cardname])
                }
            }
            
                    console.log('in first if statement')
                    // this logic is correct up tell here.


            return masterArray
        case 'DRAFTED_CARD_VALUES_CLEAR':
            return []
        default:
            return state;
    }
}

// this is the admin cards values.
export default draftedCardValues;