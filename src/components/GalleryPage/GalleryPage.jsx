import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <p>THIS IS THE GALLERY PAGE</p>
            <Link to="/upload">
                <button>Upload</button>
            </Link>
            {imageList.slice(1).map((image, index) => (
                <div key={index}>
                    <img src={image.Url} alt={`Image ${index}`} />
                    <p>{captionList[index]}</p>
                </div>
            ))}            
        </div>
    )
};

export default GalleryPage;