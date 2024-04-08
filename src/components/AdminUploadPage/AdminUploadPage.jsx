import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

function AdminUploadPage() {
    const pendingIndex = useSelector((store) => store.pendingCaptionStartIndex);

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
        axios.get('/api/upload/captions').then(response => {
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
                axios.delete(`/api/upload/image/${encodeURIComponent(imageName)}`)
                    .then(() => {
                        console.log('Image deleted successfully from the database');
                        getPendingImages(); // Refresh pending images after deletion
                        window.location.reload(); // Refresh the page
                    })
                    .catch(error => {
                        console.error('Error deleting image from the database:', error);
                        alert('Something went wrong');
                    });
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

    const approveImage = async (imageName) => {
        try {
            await axios.put(`/api/upload/approve/${encodeURIComponent(imageName)}`);
            deleteFromPending(imageName)
            getPendingImages(); // Refresh pending images after approval
            window.location.reload(); // Refresh the page
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
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '340px', position: 'relative' }}>
                            <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
                            <p>{captionList[index]}</p>
                            <div>
                                <Button onClick={() => approveImage(image.Key)} style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>Approve</Button>
                                <Button onClick={() => deleteImage(image.Key)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AdminUploadPage;
