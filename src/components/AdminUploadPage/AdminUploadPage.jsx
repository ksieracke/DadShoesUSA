import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';

function AdminUploadPage() {
    const user = useSelector((store) => store.user);
    const [pendingImageList, setPendingImageList] = useState([]);

    const getPendingImages = async () => {
        try {
            const response = await axios.get('/api/upload/admin');
            console.log("Response data:", response.data);
            setPendingImageList(response.data);
        } catch (error) {
            console.log('Error fetching pending images:', error);
            alert('Something went wrong');
        }
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
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Pending Images</h1>
            <Grid container spacing={2}>
                {pendingImageList.slice(1).map((image, index) => (
                    <Grid item key={image.Key} xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '300px', position: 'relative' }}>
                            <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
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
