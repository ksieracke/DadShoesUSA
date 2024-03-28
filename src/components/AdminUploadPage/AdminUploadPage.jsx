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
            console.log("11111",response.data);
            setPendingImageList(response.data);
            console.log("22222",pendingImageList);
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

    const approveImage = () =>{

    };

    const deleteImage = (imageName) => {
        console.log(imageName);
        axios.delete(`/api/upload/image/${encodeURIComponent(imageName)}`)
            .then(() => {
                console.log('Image deleted successfully');
                // Refresh pending images after deletion
                getPendingImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                alert('Something went wrong');
            });
    };
    
    useEffect(() => {
        getPendingImages();
        // getPendingCaptions();
    }, []);


    return(
        <div>
            <p>Admin Upload Page!!!</p>
            {pendingImageList.slice(1).map((image, index) => (
                <div key={image.Key}>
                    <img src={image.Url} alt={`Image ${index}`} />
                    {/* <p>{pendingCaptionList[index]}</p> */}
                    <button onClick={approveImage}>Approve</button>
                    <button onClick={() => deleteImage(image.Key)}>Delete</button>
                </div>
                ))}  
        </div>
    );
}
export default AdminUploadPage;