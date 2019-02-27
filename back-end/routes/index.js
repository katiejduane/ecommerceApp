var express = require('express');
var router = express.Router();
const passport = require('passport');
const pgp = require('pg-promise')();
const config = require('../config');
const connection = config.pg;
const db = pgp(connection);


/* GET home page. */
router.get('/auth/github', passport.authenticate('github'));
 
router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
  const selectQuery = `SELECT * FROM users WHERE username = $1`;
  const username = req.user.username;
  db.query(selectQuery, [username]).then((data)=>{
    if(data.length === 0) {
      const insertQuery = `INSERT INTO users(username)
      VALUES ($1)`
      db.query(insertQuery, [username]).then((results)=>{
        
      })
    }
    console.log(data, [username]);
    res.json(data);
  }).catch((error)=>{
    res.json(error)
  })
  // res.json(req.user);
})

module.exports = router;
