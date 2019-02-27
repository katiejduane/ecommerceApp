var express = require('express');
var router = express.Router();
const passport = require('passport');
const pgp = require('pg-promise')();
const config = require('../config');
const connection = config.pg;
const db = pgp(connection);
const bcrypt = require('bcrypt-nodejs')


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

router.post('/register', (req, res, next) => {
  //we'll need bcrypt
  //check if username exists
  const checkUserNameQuery = `SELECT * FROM users WHERE username = $1;`;
  db.query(checkUserNameQuery, [req.body.username]).then((results)=>{
    // console.log(results)
    if(results.length === 0) {
      const insertUserQuery = `INSERT INTO users (username) VALUES ($1);`;
      db.query(insertUserQuery, [req.body.username]).then(()=>{
        res.json({msg: "userAdded"})
      })
    }else{
      //user exists!
      res.json({msg: "userExists"})
    }
  }).catch((error)=>{
    if(error){throw error}
  })
  //if not, insert username and hashed password
  //we'll also need to create a token
  // res.json(req.body)
})


module.exports = router;
