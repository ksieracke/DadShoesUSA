import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

function AdminUploadPage() {
    const pendingIndex = useSelector((store)=>store.pendingCaptionStartIndex);

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

            console.log("imageList length: ",pendingIndex);

        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }

    // const getCaptions = (images) => {
    //     const keys = images.map(image => image.Key);
    //     axios.post('/api/upload/captions/admin', { keys })
    //         .then(response => {
    //             setCaptionList(response.data);
    //         })
    //         .catch(error => {
    //             console.log('error', error);
    //             alert('Something went wrong');
    //         });
    // }

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
                console.log('Image deleted successfully');
                getPendingImages(); // Refresh pending images after deletion
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                alert('Something went wrong');
            });
    };

    const deleteFromPending = (imageName) => {
        console.log(imageName);
        axios.delete(`/api/upload/image/approved/${encodeURIComponent(imageName)}`)
            .then(() => {
                console.log('Image deleted successfully');
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
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '300px', position: 'relative' }}>
                            <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
                            <p>{captionList[index+pendingIndex-1]}</p>
                            <div>
                                <Button onClick={() => approveImage(image.Key)}>Approve</Button>
                                <Button onClick={() => deleteImage(image.Key)}>Delete</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AdminUploadPage;
