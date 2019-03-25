const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const tableList = require('../modules/tableList')

router.get('/default', (req, res) => {
    console.log('in default api route')
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
    WHERE "card_table"."type" = 'Hero'
    ORDER BY "admin_table"."default_value" DESC;`
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
});

router.post('/default', (req, res) => {
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

router.put('/default', (req, res) => {
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

router.post('/draft', (req, res) => {
    console.log('in post draft logging req.body', req.body.parentCardName)
    const queryText = `ALTER TABLE "admin_table" ADD $1 DECIMAL (4,1);`
    const queryValues = [req.body.parentCardName]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing POST shelf query', err);
            res.sendStatus(500);
        });
});

router.put('/draft', (req, res) => {
    const postdefault = req.body;
    const queryText = `UPDATE "admin_table"
    SET $1 = $2
    WHERE "card_id" = $3 ;`
    const queryValues = [postdefault.parentCardName, postdefault.card_value, postdefault.id]
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing POST shelf query', err);
            res.sendStatus(500);
        })
})

router.post('/all', (req, res) => {
    // includes.
    console.log(" in admin.router /all logging req.body,", req.body.cardname.toLowerCase());
    const columnname = (req.body.cardname.toLowerCase().split(' ').join('_'))
    if (tableList.includes(columnname)) {
    const queryText = `SELECT "admin_table".${columnname},
    "card_table"."id" as "card_id",
    "card_table"."card_name",
    "card_table"."type",
    "card_table"."rarity",
    "color"."color_name", 
    "card_table"."img_url" FROM "card_table"
   JOIN "color" ON "color"."id" = "card_table"."color_id"
    LEFT JOIN "admin_table"
     ON "card_table"."id" = "admin_table"."card_id" 
    WHERE "card_table"."type" = 'Hero'
    ORDER BY "admin_table"."default_value" DESC;`;
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(500);
    }
});

router.put('/alls', (req, res) => {
    console.log('inn all put ie update card values going to test. logging ', req.body.parentCardName.toLowerCase().split(' ').join('_'))
    const columnname = req.body.parentCardName.toLowerCase().split(' ').join('_');
    if (tableList.includes(columnname)) {
        const postdefault = req.body;
        const queryText = `UPDATE "admin_table" 
        SET ${columnname} = $1
        WHERE "card_id" = $2`
        const queryValues = [postdefault.card_value, postdefault.id]
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing POST shelf query', err);
            res.sendStatus(500);
        })
    }
    else {
        res.sendStatus(500);
    }
})

module.exports = router;