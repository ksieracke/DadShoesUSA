import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';

function GalleryPage() {
    const user = useSelector((store) => store.user);
    const [imageList, setImageList] = useState([]);
    const [captionList, setCaptionList] = useState([]);

    const getImages = () => {
        axios.get('/api/upload').then(response => {
            console.log(response.data);
            setImageList(response.data);
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
        <div>
            <h1>Dad Shoes in Action</h1>
            <div className='upload'>
                <Link to="/upload">
                    <Button>Upload an Image of your Dad Shoes in Action</Button>
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
