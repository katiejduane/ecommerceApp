const express = require("express");
const router = express.Router();
const db = require('../database')

router.get("/getHome", (req, res, next) => {
    const horseQuery = `SELECT * FROM games
    WHERE screenshot_url IS NOT NULL ORDER BY popularity desc limit 4;`
    ;
    db.query(horseQuery).then((results)=> {
        res.json(results)
    }).catch((error)=>{
        if(error){throw error}
    })
    // res.json("horses")
})

router.get('/:hid', (req, res) => {
    const hid = req.params.hid;
    const selectQuery = `SELECT * FROM games WHERE id = $1`;
    db.query(selectQuery, [hid]).then((horseData)=>{
        res.json(horseData);
    }).catch((error)=> {
        if(error){throw error}
    })
})

module.exports = router;