var express = require('express');
var router = express.Router();
const db = require('../database');

// get cart
router.post("/getCart", (req, res, next) => {
    const token = req.body.token;
    const getUser = `SELECT id from users WHERE token = $1;`;
    db.query(getUser, [token]).then((results) => {
        if (results.length === 0) {
            res.json({
                msg: "badToken"
            })
        } else {
            const uid = results[0].id
            const getCartTotals = `SELECT * FROM cart 
                INNER JOIN games on games.id = cart.id
                WHERE id = $1`;
            db.query(getCartTotals, [uid]).then((results)=>{
                const totals = `SELECT SUM(price) as totalPrice, count(price) as totalItems
                FROM cart
                INNER JOIN games on games.id = cart.gid
                WHERE uid = $1`
                db.query(totals, [uid]).then((totalNumbers)=>{
                    const responseData = {
                        content: results,
                        total: totalNumbers.totalPrice,
                        items: totalItems

                    }
                })
            })
        }
    }).catch((error) => {
        if (error) { throw error };
    })
})

//update cart
router.post('/updateCart',(req, res) => {
    const token = req.body.token;
    const getUser = `SELECT id from users WHERE token = $1`
    db.query(getUser, [token]).then((results)=>{
        if(results.length === 0){
            //this is a bad token, the user is either confused or a liar
            res.json({
                msg: "badToken"
            })
        }else{
            const uid = results[0].id;
            const itemId = req.body.itemId;
            const addToCartQuery = `INSERT INTO cart (uid, gid, date) 
            VALUES
            ($1,$2,NOW())`
            db.query(addToCartQuery, [uid, itemId]).then(()=>{
                const getCartTotals = `SELECT * FROM cart WHERE uid = $1`
                db.query(getCartTotals, [uid]).then((results)=> {
                    res.json(results)
                }).catch((error)=>{
                    if(error){throw error}
                })
            }).catch((error)=> {
                if(error){throw error}
            })
        }
    }).catch((error)=>{
        if(error){throw error}
    })
})

module.exports = router;