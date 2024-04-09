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
import { Paper, backdropClasses } from '@mui/material';

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
        <> 
        
        <div className="purchase-container">
            <div className="image-container">
                <img src="../../../public/images/PXL_20240409_012914784.PORTRAIT-EDIT.jpg" alt="Promo Image 1" />
            </div>
            <div className="form-container">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center' }}>
                        <div style={{ textAlign: 'center', width: '95%', margin: 'auto', marginBottom: '20px' }}> {/* Increased marginBottom here */}
                                <Paper className='wisdomInEveryStep' elevation={3} style={{ backgroundColor: '#98b1c8'}}>
                                    
                <p className='wisdom' style={{ padding: '5px', marginBottom: '15px'  }}>
                <p><b>Wisdom in every step:</b><br></br> <i>Each pair meticulously broken in by a seasoned dad mowing his lawn, infusing the shoes with a wealth of dad knowledge. Wear them, and absorb the years of invaluable dad wisdom.</i></p>
            </p>
            <br></br>
            <h1>$65</h1>
            <h3>+ Free Shipping!</h3>
            <br></br>
            
            </Paper>
        </div>
                        </Box>
                    </Grid>
                
                    <Grid item xs={8} >
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
                        <Link to="/checkout" style={{ textDecoration: 'none' }}>
                            <Button onClick={handlePurchaseSubmit} variant="contained" style={{
            whiteSpace: 'pre-line',
            wordWrap: 'break-word',
            maxWidth: '225px',
            color: 'white',
            backgroundColor: '#24496b',
            transition: 'font-size 0.3s ease', // Add transition for smooth effect
            fontSize: '1rem', // Set initial font size
        }}
        onMouseEnter={(e) => e.target.style.fontSize = '1.1rem'} // Increase font size on hover
        onMouseLeave={(e) => e.target.style.fontSize = '1rem'}>
                                Buy Now
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}>
        <div className='quoteContainer'>
        <i><b><h3 className='Quotes'>Customer Testimonials</h3></b></i>
        <Grid container spacing={2} justifyContent="center">
            
            <Grid item xs={12} md={4} textAlign="center">
                <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"My Dad Shoes gave me a huge jump start on fatherhood, perfect swaddle every time, ability to fix household objects with just a few simple tools and a can-do attitude, and so much more"</p></Paper>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
            <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"I wear my Dad Shoes because nothing shows 'I'm a responsible adult' quite like wearing sneakers with grass stains."</p></Paper>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
            <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"I used to dread mowing the lawn, but now with my Dad Shoes, it's a meditative experience. Plus, the lawn looks great!"</p></Paper>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
            <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"Dad Shoes are like a secret handshake among dads. Instant respect guaranteed!"</p></Paper>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
            <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"My Dad Shoes are like a Swiss Army knife for fatherhood - versatile, reliable, and always ready for action."</p></Paper>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
            <Paper style={{backgroundColor: '#e0ecfb', padding: '8px'}}><p>"Wearing Dad Shoes is like wearing a badge of honor. It says, 'I'm a dad, and I'm proud of it!'"</p></Paper>
            </Grid>
        </Grid>
        </div>
        <br></br>
        </Paper>
        </>
    );
}

export default PurchasePage;
