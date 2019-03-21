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
});

module.exports = router;