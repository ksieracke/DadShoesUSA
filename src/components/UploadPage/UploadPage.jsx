import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function UploadPage() {
    const user = useSelector((store) => store.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const clearForm = () => {
        setSelectedFile(undefined);
        setCaption('');
    }

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
        console.log(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
        alert('Please select a file');
        return;
        }
        else{
            dispatch({
                type: 'UPLOAD_TO_DB',
                payload: {
                file: selectedFile.name,
                caption: caption,
                id: user.id,
                },
            })

            // const fileToUpload=event.target.files[0];
            // setSelectedFile(fileToUpload);

            const fileName=encodeURIComponent(selectedFile.name);
            const formData = new FormData();
            formData.append('image', selectedFile);
            axios.post(`/api/upload/image?imageName=${fileName}`, formData).then(response =>{
                console.log("SUCCESSFUL UPLOAD TO S3");
                clearForm();
            }).catch(error =>{
                console.log('error', error);
                alert('something went wrong with s3 upload')
            })
        }
    };

    return (
        <>
        <p>UPLOAD PAGE</p>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <br />
            <input
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter caption"
            />
            <br />
            <button type="submit">Upload</button>
        </form>
        {selectedFile && (
            <div>
            <p>Preview:</p>
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            </div>
        )}
        </>
    );
    }

export default UploadPage;