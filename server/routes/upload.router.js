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

//post route to handle upload image upload to S3 bucket pending-Images folder
router.post('/image', async (req, res)=>{
  try{
    const { imageName } = req.query;
    const  imageData  = req.files.image.data;

    const params = {
      Bucket: 'dad-shoes-usa-images',
      Key: `pending-Images/${imageName}`,
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

// POST route to handle image name & caption upload to DB
router.post('/', (req, res) => {
    console.log('in router.post');
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    try{
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

//get route for gallery page to get approved images
router.get('/', async (req, res) => {
  try {
      const params = {
          Bucket: 'dad-shoes-usa-images',
          Prefix: 'approved-Images/', // Specify the folder path here
      };

      s3Client.listObjectsV2(params, (err, data) => {
          if (err) {
              console.error('Error listing objects:', err);
              return res.sendStatus(500);
          }

          const images = data.Contents.map(obj => {
              return {
                  Key: obj.Key,
                  Url: s3Client.getSignedUrl('getObject', { Bucket: params.Bucket, Key: obj.Key }),
              };
          });

          res.json(images);
      });
  } catch (error) {
      console.error('Error retrieving images:', error);
      res.sendStatus(500);
  }
});

//get route to handle captions on gallery page pulled from DB
router.get('/captions', async (req, res) => {
  try {
      // Query the database to fetch captions
      const queryText = 'SELECT * FROM picture_gallery';
      const result = await pool.query(queryText);
      console.log("!!!!!!!!!",result);
      // Extract captions from the query result
      const captions = result.rows.map(row => row.caption);
      console.log(captions);
      // Send the captions as the response
      res.json(captions);
  } catch (error) {
      console.error('Error retrieving captions:', error);
      res.sendStatus(500);
  }
});

// !!!!!!!!!!!!!!!!!!TODO NEXT!!!!!!!!!!!!!
// 
// figure out how to handle captions for pending vs approved
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//get route for upload/admin page to show images still pending approval
router.get('/admin', async (req, res) => {
  try {
    const params = {
      Bucket: 'dad-shoes-usa-images',
      Prefix: 'pending-Images',
    };
    
    s3Client.listObjectsV2(params, (err, data) => {
      if (err) {
        console.error('Error listing objects:', err);
        return res.sendStatus(500);
      }
      const images = data.Contents.map(obj => {
        return {
          Key: obj.Key,
          Url: s3Client.getSignedUrl('getObject', { Bucket: params.Bucket, Key: obj.Key }),
        };
      });
      
      res.json(images);
    });
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.sendStatus(500);
  }
});

router.delete('/image/:imageName', async (req, res) => {
  console.log("((((((((()))))))))",req.params);
  try {
      const { imageName } = req.params;
      console.log('Deleting image:', imageName);

      const params = {
          Bucket: 'dad-shoes-usa-images',
          Key: `${imageName}`,
      };

      s3Client.deleteObject(params, (err, data) => {
          if (err) {
              console.error('Error deleting image:', err);
              return res.sendStatus(500);
          }

          console.log('Image deleted successfully from s3');
          res.sendStatus(200);
          //TODO write pool.query to delete caption from DB
          const imageToDelete=imageName.substring(imageName.indexOf("/")+1);
          const queryText=`DELETE FROM picture_gallery WHERE url = $1`
          pool.query(queryText, [imageToDelete])
          .then(result => {
            // Return the inserted row as the response
            res.status(201).json(result.rows[0]);
          })
          .catch(error => {
            console.error('Error deleting image from DB:', error);
            res.status(500).json({ message: 'Error deleting image from db' });
          });
      });
  } catch (error) {
      console.error('Error deleting image:', error);
      res.sendStatus(500);
  }
});

router.delete('/image/approved/:imageName', async (req, res) => {
  console.log("((((((((()))))))))",req.params);
  try {
      const { imageName } = req.params;
      console.log('Deleting image:', imageName);

      const params = {
          Bucket: 'dad-shoes-usa-images',
          Key: `${imageName}`,
      };

      s3Client.deleteObject(params, (err, data) => {
          if (err) {
              console.error('Error deleting image:', err);
              return res.sendStatus(500);
          }

          console.log('Image deleted successfully from s3');
          res.sendStatus(200);
          //TODO write pool.query to delete caption from DB
          // const imageToDelete=imageName.substring(imageName.indexOf("/")+1);
          // const queryText=`DELETE FROM picture_gallery WHERE url = $1`
          // pool.query(queryText, [imageToDelete])
          // .then(result => {
          //   // Return the inserted row as the response
          //   res.status(201).json(result.rows[0]);
          // })
          // .catch(error => {
          //   console.error('Error deleting image from DB:', error);
          //   res.status(500).json({ message: 'Error deleting image from db' });
          // });
      });
  } catch (error) {
      console.error('Error deleting image:', error);
      res.sendStatus(500);
  }
});

// Route to approve an image
router.put('/approve/:imageName', async (req, res) => {
  try {
      const { imageName } = req.params;

      const copyParams = {
          Bucket: 'dad-shoes-usa-images',
          CopySource: `dad-shoes-usa-images/${imageName}`,
          Key: `approved-Images/${imageName.substring(imageName.indexOf('/'))}`,
      };

      await s3Client.copyObject(copyParams).promise();

      res.sendStatus(200);
  } catch (error) {
      console.error('Error approving image:', error);
      res.sendStatus(500);
  }
});

module.exports = router;