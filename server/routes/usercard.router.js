const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/userget', (req, res) => {
    console.log(req.body)
    const queryText = ` SELECT * FROM "user_rating" WHERE "user_id" = $1;`
    const queryValues = [req.body.user_id]
    pool.query(queryText, queryValues)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
});


router.post('/userpost', (req, res) => {
    if (req.body.is_default){
        console.log('hit /userpost ie post for update default cards from user logging req.body', req.body)
        const postdefault = req.body;
        const queryText =` INSERT INTO "user_rating"
         ("user_card_value", "user_id", "card_id", "is_default")
          VALUES ($1, $2, $3, $4);`
        const queryValues = [postdefault.card_value, postdefault.user_id, postdefault.id, postdefault.is_default];
        pool.query(queryText, queryValues)
            .then((result) => { res.send(result.rows); })
            .catch((err) => {
                console.log('Error completing get shelf query', err);
                res.sendStatus(500);
            });
    }
    else {
        console.log('hit /userpost', req.body)
        const postdefault = req.body;
        const queryText =` INSERT INTO "user_rating"
         ("user_card_value", "user_id", "card_id", "parent_card_id")
          VALUES ($1, $2, $3, $4);`
        const queryValues = [postdefault.card_value, postdefault.user_id, postdefault.id, postdefault.parentCard];
        pool.query(queryText, queryValues)
            .then((result) => { res.send(result.rows); })
            .catch((err) => {
                console.log('Error completing get shelf query', err);
                res.sendStatus(500);
            });
    }
    
});

router.put('/userput', (req, res) => {
    if (req.body.is_default){
        console.log('in if statement of put for userput ie user default')
    const postdefault = req.body;
    const queryText = ` UPDATE "user_rating"
    SET "user_card_value" = $1
    WHERE "user_id" = $2 AND
    "card_id" = $3 AND
    "is_default" = TRUE;`
    const queryValues = [postdefault.card_value, postdefault.user_id, postdefault.id]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing POST shelf query', err);
            res.sendStatus(500);
        }) }

    else {
        console.log('in else statement of put for userput ie user draft')
        const postdefault = req.body;
    const queryText = ` UPDATE "user_rating"
    SET "user_card_value" = $1
    WHERE "user_id" = $2 AND
    "card_id" = $3 AND
    "parent_card_id" = $4;`
    const queryValues = [postdefault.card_value, postdefault.user_id,postdefault.id, postdefault.parentCard]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing POST shelf query', err);
            res.sendStatus(500);
        })
    }
})

module.exports = router;