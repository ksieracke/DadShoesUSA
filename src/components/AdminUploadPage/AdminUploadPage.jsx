import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
function AdminUploadPage(){

    const user = useSelector((store) => store.user);
    const [pendingImageList, setPendingImageList] = useState([]);
    const [pendingCaptionList, setPendingCaptionList] = useState([]);
    

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

    const getPendingCaptions = () => {
        axios.get('/api/upload/captions/admin').then(response => {
            setPendingCaptionList(response.data);
        }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
        });
    }

    

    // const approveImage = (imageName) => {
    //     console.log(imageName.substring(imageName.indexOf('/')));
    //     try {
    //         // Construct parameters for copying the image
    //         const copyParams = {
    //             Bucket: 'dad-shoes-usa-images',
    //             CopySource: `dad-shoes-usa-images/${imageName}`,
    //             Key: `approved-Images/${imageName.substring(imageName.indexOf('/'))}`,
    //         };
    
    //         // Copy the image from pending-Images to approved-Images
    //         s3Client.copyObject(copyParams, (err, data) => {
    //             if (err) {
    //                 console.error('Error copying image:', err);
    //                 return alert('Failed to approve the image');
    //             }
    
    //             console.log('Image approved successfully');
    //             // Once copied, delete the image from pending-Images
    //             deleteImage(imageName);
    //         });
    //     } catch (error) {
    //         console.error('Error approving image:', error);
    //         alert('Failed to approve the image');
    //     }
    // };

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

    const approveImage = async (imageName) => {
        try {
            await axios.put(`/api/upload/approve/${encodeURIComponent(imageName)}`);
            deleteImage(imageName)
            getPendingImages(); // Refresh pending images after approval
        } catch (error) {
            console.error('Error approving image:', error);
            alert('Failed to approve the image');
        }
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
                    <button onClick={() => approveImage(image.Key)}>Approve</button>
                    <button onClick={() => deleteImage(image.Key)}>Delete</button>
                </div>
                ))}  
        </div>
    );
}
export default AdminUploadPage;