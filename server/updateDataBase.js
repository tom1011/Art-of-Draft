require('dotenv').config();
// note this is not hooked up It is seprated becuse I ran it once and Don't want to touch it uptill
// streach goals.

const axios = require('axios');
const pool = require('./modules/pool')
// don't forget to uncomment function.

let rawinfo = {};

//funciton updates DB ONLY RUN ONCE!
// will make an update to DB as a strech goal.
updateData = (array) => {
    for (let i = 0; i < array.length; i++){
    const queryText = ` INSERT INTO "card_table" ("card_name", "type" ,"rarity", "img_url", "color_id")
    VALUES ($1, $2, $3 , $4, $5);`
    const queryValues = [
        array[i].name,
        array[i].type,
        array[i].rarity,
        array[i].img,
        array[i].color,
    ]
    pool.query(queryText, queryValues)
    }
}


// cleans up the api stuff from the huge objects to just the 
// ones i want.
cleandata = (rawdata) => {
    console.log(rawdata)
    let cleanarray = []
    // card list is an array.
    // rawdata.card_set.card_list
    cardlist = rawdata.card_set.card_list
    console.log('in clean data')
    for (let i = 0; i < cardlist.length; i++){
        // console.log('in for loop'
        let cardtype = cardlist[i].card_type;
        let cardname = cardlist[i].card_name.english;
        let cardimg = cardlist[i].large_image.default;
        let cardrarity = cardlist[i].rarity;
        let cardcolor = undefined;
        // this is to add it so I don't have to do a join on the DB
        // when adding it to.
        if (cardlist[i].is_blue){
            cardcolor = 2
        }
        else if (cardlist[i].is_green){
            cardcolor = 3
        }
        else if (cardlist[i].is_red){
            cardcolor = 1
        }
        else if (cardlist[i].is_black){
            cardcolor = 4
        } else {
            cardcolor = 5
        }
        //validation since not every card from API is what I want
        // it has prototype cards on the API so this is to make sure
        // I only get the cards in the Game.
        if (cardtype, cardname, cardimg, cardrarity){
            cleanarray.push({
                name: cardname,
                type: cardtype,
                img: cardimg,
                rarity: cardrarity,
                color: cardcolor,
            })
        }
    }
    // console.log('in going to updateData logging cleanarray', cleanarray)
    updateData(cleanarray) 
}

// get API stuff 

runstart = () =>{
    axios({
        method: 'GET',
        url: `API_KEY`,
        // note I replaced the url with API_KEY but I don't have it set up right.
    }).then(response => {
        console.log(response.data)
        rawinfo = response.data;
        cleandata(rawinfo);
    }).catch((err) => {
        console.log('Error completing GET query', err);
        res.sendStatus(500);
    })
}

runstart();


// I will only need to run this once at the start
// it will import everything I want from the API to the DB
// after the intial load I don't need to do it agien unless it updates
// I will have to set up an Admin route to do that
// that is strech goal for this project and very low on the pole.