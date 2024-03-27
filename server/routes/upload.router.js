
const express = require('express');
//const multer = require('multer');
const aws = require('aws-sdk');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const s3Client = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

router.post('/image', async (req, res)=>{
  try{
    const { imageName } = req.query;
    const  imageData  = req.files.image.data;

    const params = {
      Bucket: 'dad-shoes-usa-images',
      Key: `${imageName}`,
      Body: imageData,
      //ACL: 'public-read',
  };

    const uploadedImage=await s3Client.upload(params).promise();
    console.log(uploadedImage.Location); //URL file can be accessed at
    res.sendStatus(201);
  }catch (error){
    console.log(error);
    res.sendStatus(500);

  }
});


//const upload=multer();

// POST route to handle image upload
router.post('/', (req, res) => {

    console.log('in router.post');
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    try{
        // const { originalname, mimetype, buffer } = req.file;
        // const {caption, userID} = req.body;
        

        

    

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
