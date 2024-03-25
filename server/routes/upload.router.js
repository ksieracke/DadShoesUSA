const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// POST route to handle image upload
router.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.body.image);
    console.log(req.body.caption);
    console.log(req.body.id);
    try{
  // Extract image and caption data from request body
  

  // Insert data into the picture_gallery table
  const queryText = `INSERT INTO picture_gallery (url, caption, customer_id) VALUES ($1, $2, $3) RETURNING *`;
  const values = [req.body.file, req.body.caption, req.body.id];

  pool.query(queryText, values)
    .then(result => {
      // Return the inserted row as the response
      res.status(201).json(result.rows[0]);
    })
    .catch(error => {
      console.error('Error inserting image:', error);
      res.status(500).json({ message: 'Error inserting image' });
    });
}
catch(error){
    console.error('Error handling image upload:', error);
    res.status(500).json({ message: 'Error handling image upload' });

}
});

module.exports = router;
