var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../database')
const bcrypt = require('bcrypt-nodejs')
const randToken = require('rand-token');


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
      // user does not exist, let's add them!
      const insertUserQuery = `INSERT INTO users (username, password, token) VALUES ($1,$2,$3);`;
      const token = randToken.uid(50);
      //use bcrypt.hashSync to make their password something evil
      const hash = bcrypt.hashSync(req.body.password)
      db.query(insertUserQuery, [req.body.username, hash, token]).then(()=>{
        res.json({
          msg: "userAdded",
          token: token,
          username: req.body.username})
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

router.post('/login', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  // get the row with this username from postgres!
  const selectUserQuery = `SELECT * FROM users WHERE username = $1`;
  db.query(selectUserQuery, [username]).then((results)=>{
    if (results.length === 0){
      //these aren't the droids we're looking for, dummbies!
      res.json({
        msg:"badUser"
      })
    }else{
      //user exists, so now check password
      const checkHash = bcrypt.compareSync(password, results[0].password)
      if (checkHash){
        //match! create a new token!
        const token = randToken.uid(50);
        //update the db with the new token
        const updateTokenQuery = `UPDATE users SET token = $1 WHERE username = $2`;
        db.query(updateTokenQuery, [token, username]).catch((error)=>{
          if(error){throw error};
        });
        res.json({
          msg: 'loginSuccess',
          token: token,
          username: username
        })
      } else{
        //bogus password!
        res.json({
          msg: "badPassword"
        })
      }
    }
  }).catch((error)=>{
    if(error){throw error}
  })
})


module.exports = router;
