import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

function GalleryPage(){

    const user = useSelector((store) => store.user);
    const [imageList, setImageList] = useState([]);
    const [captionList, setCaptionList] = useState([]);

    const getImages = () => {
        axios.get('/api/upload').then(response => {
            console.log(response.data);
            setImageList(response.data);
            console.log(imageList);
            //setImageList(imageList.slice(1))
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
    return(
        <div>
        <h1>Dad Shoes in Action</h1>
        <Link to="/upload">
            <button>Upload</button>
        </Link>
        <Grid container spacing={2}>
            {imageList.slice(1).map((image, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={image.Url} alt={`Image ${index}`} style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }} />
                        <p>{captionList[index]}</p>
                    </div>
                </Grid>
            ))}
        </Grid>
    </div>
    )
};

export default GalleryPage;