const draftedCardValues = (state = [], action) => {
    switch (action.type) {
        case 'DRAFTED_CARD_VALUES_DEFAULT':
            // admin default cards, user are the user changed cards.
            let masterArray = action.payload.admin

            for (let i = 0; i < action.payload.user.length; i++) {
                if (action.payload.user[i].is_default) {// the user changed a default value so it will now run to next step
                    for (let j = 0; j < masterArray.length; j++) {
                        if (action.payload.user[i].card_id === masterArray[j].card_id) {
                            masterArray[j].default_value = action.payload.user[i].user_card_value
                        }
                    }
                }
            }
            return masterArray

        case 'DRAFTED_CARD_VALUES':
            let cardname = action.payload.cardname.toLowerCase().split(' ').join('_')
            let newmasterArray = [...state]

            let modifiyed = false
            for (let j = 0; j < newmasterArray.length; j++) {
                modifiyed = false
                for (let i = 0; i < action.payload.user.length; i++) {
                    if (!action.payload.user[i].is_default){
                    // this is the first check to do from the user it get ride of every that is not default
                    {
                        if (action.payload.user[i].card_id === newmasterArray[j].card_id){ 
                            // only card selected is beinning put though.
                            // i need to check if the user card parent is the selected card id
                            if (action.payload.user[i].parent_card_id === action.payload.cardId) {
                                newmasterArray[j].default_value = Math.round(  10 * (Number(newmasterArray[j].default_value) + Number(action.payload.user[i].user_card_value)))/10
                            modifiyed = true
                        }}
                    }}
                }
                // note I dont have another for loop here since master Array and admin Values should be lined up.
                if (!modifiyed) {
                    newmasterArray[j].default_value = Math.round(10 * (Number(newmasterArray[j].default_value) + Number(action.payload.adminValues[j][cardname])))/10
                    }
            }
            return newmasterArray
        case 'DRAFTED_CARD_VALUES_CLEAR':
            return []
        default:
            return state;
    }
}

// this is the admin cards values.
export default draftedCardValues;