import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';

import './PurchasePage.css'; 

function PurchasePage() {
    const dispatch = useDispatch();

    const [size, setSize] = useState('');

    const handleSizeChange = (event) => {
        setSize(event.target.value);
        dispatch({
            type: 'SET_SIZE',
            payload: event.target.value,
        });
    };
    
    const handlePurchaseSubmit = (event) => {
        if (!size) {
            alert("Please select a size before purchasing.");
            event.preventDefault();
        }
        console.log(size);
        console.log('purchase button clicked');
    }

    return (
        <div className="purchase-container">
            <div className="image-container">
                <img src="../../../public/images/placeholder_image.jpeg" alt="Promo Image 1" />
            </div>
            <div className="form-container">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                value={size}
                                label="size"
                                onChange={handleSizeChange}
                            >
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={8.5}>8.5</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={9.5}>9.5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={10.5}>10.5</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={11.5}>11.5</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={12.5}>12.5</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handlePurchaseSubmit} variant="contained" color="primary">
                            Buy Now
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default PurchasePage;
