import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

function AdminUploadPage() {
    const pendingIndex = useSelector((store) => store.pendingCaptionStartIndex);
    const user = useSelector((store) => store.user);

    const [pendingImageList, setPendingImageList] = useState([]);
    const [captionList, setCaptionList] = useState([]);
    const [imageList, setImageList] = useState([]);

    const dispatch = useDispatch();

    const getPendingImages = async () => {
        try {
            const response = await axios.get('/api/upload/admin');
            console.log("Response data:", response.data);
            setPendingImageList(response.data);
            getCaptions(response.data); // Fetch captions when images are fetched
        } catch (error) {
            console.log('Error fetching pending images:', error);
            alert('Something went wrong');
        }
    }

    const getImages = () => {
        axios.get('/api/upload').then(response => {
            console.log(response.data);
            setImageList(response.data);
            dispatch({
                type: 'SET_PENDING_INDEX',
                payload: response.data.length,
            });

            console.log("imageList length: ", pendingIndex);

        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }

    const getCaptions = () => {
        axios.get('/api/upload/captions/pending').then(response => {
            setCaptionList(response.data);
        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }

    const deleteImage = (imageName) => {
        console.log(imageName);
        axios.delete(`/api/upload/image/${encodeURIComponent(imageName)}`)
            .then(() => {
                console.log('Image deleted successfully from S3 bucket');
                // Now, delete the image from the database

                window.location.reload(); // Refresh the page
                
            })
            .catch(error => {
                console.error('Error deleting image from S3 bucket:', error);
                alert('Something went wrong');
            });
    };
    
    const deleteFromPending = (imageName) => {
        console.log(imageName);
        axios.delete(`/api/upload/image/approved/${encodeURIComponent(imageName)}`)
            .then(() => {
                console.log('Image deleted successfully');
                axios.delete()
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                alert('Something went wrong');
            });
    };

    const deleteFromPendingDB = (caption) => {
        console.log('CAPTION:', caption);
        axios.delete(`/api/upload/image/pending/${encodeURIComponent(caption)}`)
          .then(() => {
            console.log('Image deleted successfully from pending_gallery table');
          })
          .catch(error => {
            console.error('Error deleting image from pending_gallery table:', error);
            alert('Something went wrong');
          });
      };



      const approveImage = async (imageName, caption) => {
        try {
            // Make a PUT request to approve the image
            await axios.put(`/api/upload/approve/${encodeURIComponent(imageName)}`);
            await deleteFromPending(imageName);
            // After the image is approved, delete it from the pending_gallery table
            await deleteFromPendingDB(caption);
    
            // Now, insert the approved image details into the picture_gallery table
            const response = await axios.post('/api/upload/approved', {
                file: imageName.substring(imageName.indexOf("/")+1), // Assuming imageName is the URL of the approved image
                caption: caption, // Assuming you want to move the caption as well
                id: user.id, // Assuming you have a function to get the user's ID
            });
    
            console.log('Image approved successfully:', response.data);
            
            // Refresh pending images after approval
            getPendingImages();
    
            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error approving image:', error);
            alert('Failed to approve the image');
        }
    };
    

    

    useEffect(() => {
        getPendingImages();
        getCaptions();
        getImages();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Pending Images</h1>
            <Grid container spacing={2}>
                {pendingImageList.slice(1).map((image, index) => (
                    <Grid item key={image.Key} xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '340px', position: 'relative', backgroundColor: '#e0ecfb', paddingBottom: '18px' }}>
                            <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
                            <p>{captionList[index]}</p>
                            <div>
                                <Button onClick={() => {approveImage(image.Key, captionList[index]);}} style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>Approve</Button>
                                <Button onClick={() => {deleteImage(image.Key); deleteFromPendingDB(captionList[index]);}} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AdminUploadPage;
