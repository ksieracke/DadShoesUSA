import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';

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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        } else {
            dispatch({
                type: 'UPLOAD_TO_DB',
                payload: {
                    file: selectedFile.name,
                    caption: caption,
                    id: user.id,
                },
            })

            const fileName = encodeURIComponent(selectedFile.name);
            const formData = new FormData();
            formData.append('image', selectedFile);
            axios.post(`/api/upload/image?imageName=${fileName}`, formData)
            .then(response => {
                console.log("SUCCESSFUL UPLOAD TO S3");
                clearForm();
            }).catch(error => {
                console.log('error', error);
                alert('something went wrong with s3 upload')
            })
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ padding: '20px', textAlign: 'center', width: '300px', marginTop: '-125px'  }}>
                <h2>Upload an image of your Dad Shoes in action</h2>
                {selectedFile && (
                    <div style={{ marginTop: '20px' }}>
                        <Paper elevation={3} style={{ textAlign: 'center', padding: '10px', height: '300px', position: 'relative' }}>
                            <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '100%', height: '240px', objectFit: 'cover' }} />
                            <p>{caption}</p>
                        </Paper>
                    </div>
                )}
                <br/ >
                <form>
    <label htmlFor="upload-button">
        <Button variant="outlined" component="span">
            Upload File
            <input
                type="file"
                id="upload-button"
                hidden
                onChange={handleFileChange}
            />
        </Button>
    </label>
    <br />
    <br />
    <input
        type="text"
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Enter caption"
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    />
    <br />
    <Button variant="outlined" component="span" type="submit" onClick={handleSubmit}>Submit</Button>

</form>

            </div>
        </div>
    );
}

export default UploadPage;
