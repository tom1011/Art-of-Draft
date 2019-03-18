const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const queryText = `SELECT 
    "card_table"."id",
    "card_table"."card_name",
    "card_table"."type", 
     "card_table"."rarity",
      "color"."color_name",
       "card_table"."img_url"
        FROM "card_table" 
        JOIN "color" ON "color"."id" = "card_table"."color_id" 
        WHERE "type" = 'Hero';`
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;