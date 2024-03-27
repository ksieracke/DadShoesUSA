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
            setImageList(response.data);
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
        });
    }
    
    useEffect(() => {
        getImages();
    }, []);

    return(
        <div>
            <p>THIS IS THE GALLERY PAGE</p>
            <Link to="/upload">
                <button>Upload</button>
            </Link>
            {imageList.map((image, index) => (
                <div key={index}>
                    <img src={image.Url} alt={`Image ${index}`} />
                </div>
            ))}
            {/* Add upload button if needed */}
            
        </div>
    )
};

export default GalleryPage;