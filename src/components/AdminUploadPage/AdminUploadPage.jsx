import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
function AdminUploadPage(){

    const user = useSelector((store) => store.user);
    const [pendingImageList, setPendingImageList] = useState([]);
    const [pendingCaptionList, setPendingCaptionList] = useState([]);

    const getPendingImages = () => {
        axios.get('/api/upload/admin').then(response => {
            console.log(response.data);
            setPendingImageList(response.data);
            console.log(pendingImageList);
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
        });
    }

    const getPendingCaptions = () => {
        axios.get('/api/upload/captions/admin').then(response => {
            setPendingCaptionList(response.data);
        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }
    
    useEffect(() => {
        getPendingImages();
        // getPendingCaptions();
    }, []);

    useEffect(() => {
        console.log("pendingImageList updated:", pendingImageList);
    }, [pendingImageList]);

    return(
        <div>
            <p>Admin Upload Page!!!</p>
            {pendingImageList.map((image, index) => (
                <div key={index}>
                    <img src={image.Url} alt={`Image ${index}`} />
                    {/* <p>{pendingCaptionList[index]}</p> */}
                </div>
                ))}  
        </div>
    );
}
export default AdminUploadPage;