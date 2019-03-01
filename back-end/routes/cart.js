var express = require('express');
var router = express.Router();
const db = require('../database');

// get cart
router.post('/getCart',(req, res) => {
    const token = req.body.token;
    const getUser = `SELECT is from users WHERE token = $1`
    db.query(getUser, [token]).then((results)=>{
        if(results.length === 0){
            //this is a bad token, the user is either confused or a liar
            res.json({
                msg: "badToken"
            })
        }else{
            const uid = results[0].id;
        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;