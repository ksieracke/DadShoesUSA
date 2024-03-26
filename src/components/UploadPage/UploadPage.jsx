import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


function UploadForm() {
    const user = useSelector((store) => store.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);



    
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
            const formData=new FormData();
            formData.append("image", selectedFile);
            formData.append("caption", caption);
            formData.append("userID", user.id);
            formData.append("approved", false);

            await axios.post('/api/upload', formData);
        }
    };

    return (
        <>
        <p>UPLOAD PAGE</p>
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleFileChange} />
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

export default UploadForm;
