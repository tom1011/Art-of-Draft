const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT "admin_table"."default_value",
    "card_table"."id" as "card_id",
    "card_table"."card_name" ,
    "card_table"."type",
    "card_table"."rarity",
    "color"."color_name", 
    "card_table"."img_url"
   FROM "card_table"
   JOIN "color" ON "color"."id" = "card_table"."color_id"
    LEFT JOIN "admin_table"
     ON "card_table"."id" = "admin_table"."card_id" 
    WHERE "card_table"."type" = 'Hero';`
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log(req.body)
    const postdefault = req.body;
    const queryText = `INSERT INTO "admin_table" ("card_id" , "default_value") VALUES ($1, $2);`
    const queryValues = [postdefault.id,
        postdefault.card_value]
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
        console.log('Error completing POST shelf query', err);
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
    const postdefault = req.body;
    const queryText = `UPDATE "admin_table"
    SET "default_value" = $2
    WHERE "card_id" = $1;`
    const queryValues = [postdefault.id,
        postdefault.card_value]
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
        console.log('Error completing POST shelf query', err);
        res.sendStatus(500);
    });
})

module.exports = router;