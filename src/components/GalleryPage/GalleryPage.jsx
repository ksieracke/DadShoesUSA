import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';

function GalleryPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [imageList, setImageList] = useState([]);
    const [captionList, setCaptionList] = useState([]);
    const [endingIndex, setEndingIndex] = useState([]);
    const pendingIndex = useSelector((store)=>store.pendingCaptionStartIndex);

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

    const getCaptions = () => {
        axios.get('/api/upload/captions').then(response => {
            setCaptionList(response.data);
        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }

    useEffect(() => {
        getImages();
        getCaptions();
    }, []);

    useEffect(() => {
        console.log("imageList updated:", imageList);
    }, [imageList]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style={{ marginBottom: '10px', marginTop: '0' }}>Dad Shoes Gallery</h1>
                <Link to="/upload">
                    <Button variant="contained" color="primary" style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', maxWidth: '200px' }}>
                        Upload an Image
                    </Button>
                </Link>
            </div>
            <Grid container spacing={2}>
                {imageList.slice(1).map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '300px', position: 'relative' }}>
                            <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
                            <p style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', margin: 'auto' }}>{captionList[index]}</p>
                        </Paper>
                    </Grid>
                    
                ))}
                
            </Grid>
        </div>
    )
};

export default GalleryPage;
