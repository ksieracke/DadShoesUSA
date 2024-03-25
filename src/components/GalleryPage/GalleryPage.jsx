import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GalleryPage(){
    const user = useSelector((store) => store.user);
    return(
        <>
        <p>THIS IS THE GALLERY PAGE</p>
        {user.id && (
          <Link to="/upload">
            <button>Upload</button>
        </Link>
        )}
        
        </>
    )
};

export default GalleryPage;