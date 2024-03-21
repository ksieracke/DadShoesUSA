const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.put('/update', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id; // Assuming you have userId available in the request
  console.log('!!!!!!!', userId);
  const { email, streetAddress, city, state, zipCode } = req.body;

  const queryText = `UPDATE "user" SET email=$1, street_address=$2, city=$3, state=$4, zip_code=$5 WHERE id=$6`;
  pool
    .query(queryText, [email, streetAddress, city, state, zipCode, userId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error updating user information:', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const streetAddress = req.body.streetAddress;
  const city=req.body.city;
  const state=req.body.state;
  const zipCode=req.body.zipCode;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (first_name, last_name, email,
    street_address, city, state, zip_code, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
  pool
    .query(queryText, [firstName, lastName, email, streetAddress, city, state, zipCode, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
