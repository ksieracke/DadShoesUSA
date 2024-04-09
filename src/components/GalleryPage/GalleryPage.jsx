import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Grid, Paper, Button, Typography } from '@mui/material';
import './GalleryPage.css'; 

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
        <div className="gallery-container">
            <div className="gallery-header">
                <Typography variant="h3" gutterBottom className="gallery-title">Dad Shoes Customer Gallery</Typography>
                <Link to="/upload">
                    <Button variant="contained" color="primary" className="upload-button" style={{width: '250px', height: '50px', backgroundColor: '#24496b',  fontSize: '1.1rem', transition: 'font-size 0.3s ease'}} onMouseEnter={(e) => e.target.style.fontSize = '1.2rem'} // Increase font size on hover
        onMouseLeave={(e) => e.target.style.fontSize = '1.1rem'}><b>Upload an Image</b></Button>
                </Link>
            </div>
            <Grid container spacing={2} className="image-grid">
                {imageList.slice(1).map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} className="image-paper" style={{backgroundColor: '#e0ecfb'}} >
                            <img src={image.Url} alt={`Image ${index}`} className="image" />
                            <Typography variant="body2" className="caption" style={{padding: '5px'}}>{captionList[index]}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
};

export default GalleryPage;
