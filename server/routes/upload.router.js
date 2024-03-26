
const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const s3 = new aws.S3({
    accessKeyId: 'AKIA3FLD6K5UB7ZQGOMT',
    secretAccessKey: null,
});
//TODO add keys to ignore file

const upload=multer();

// POST route to handle image upload
router.post('/', upload.single('image'), async(req, res) => {
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    try{
        const { originalname, mimetype, stream } = req.file;
        const {caption, userID} = req.body;
        

        const params = {
            Bucket: 'dad-shoes-usa-images',
            Key: `${Date.now()}_${originalname}`,
            Body: stream,
            ContentType: mimetype,
            ACL: 'public-read',
        };

        const uploadedImage=await s3.upload(params).promise();
    }

//   // Insert data into the picture_gallery table
//   const queryText = `INSERT INTO picture_gallery (url, caption, customer_id) VALUES ($1, $2, $3) RETURNING *`;
//   const values = [req.body.file, req.body.caption, req.body.id];

//   pool.query(queryText, values)
//     .then(result => {
//       // Return the inserted row as the response
//       res.status(201).json(result.rows[0]);
//     })
//     .catch(error => {
//       console.error('Error inserting image:', error);
//       res.status(500).json({ message: 'Error inserting image' });
//     });
// }
catch(error){
    console.error('Error handling image upload:', error);
    res.status(500).json({ message: 'Error handling image upload' });

}
});

module.exports = router;
