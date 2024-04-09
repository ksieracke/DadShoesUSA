import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';

import './LandingPage.css';

function LandingPage() {
  const [heading, setHeading] = useState('Dad Shoes USA');
  const [randomQuote, setRandomQuote] = useState('');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const dadQuote = () => { 
    axios({
      method: 'GET',
      url: '/api/quotes'
    })
    .then((response) => {
      let quoteList = response.data;
      let randQuoteIndex = Math.floor(Math.random() * quoteList.length);
      let randomQuote = quoteList[randQuoteIndex];
      setRandomQuote(randomQuote);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    dadQuote();
  }, []); 

  return (
    <div className="container" >
      <Typography variant="h5" gutterBottom style={{marginBottom: '0px', marginTop: '-10px'}}><h1>{heading}</h1></Typography>
      <Typography variant="h4" gutterBottom style={{marginBottom: '0px'}}><h7><i>Step into Wisdom</i></h7></Typography>


      <img className='bigImage' src="../../../public/images/PXL_20240407_181338163.PORTRAIT (1).jpg" alt="Big Image" style={{ marginBottom: '10px', marginTop: '3px', maxWidth: '90%', borderRadius: '5px'  }} />
      
      <Paper elevation={4} className='quotePaper' style={{ textAlign: 'center', width: '100%', padding: '10px', backgroundColor: '#e0ecfb', marginTop: '2px', marginBottom: '10px', maxWidth: '90%' }}>
      <Typography variant="h4" gutterBottom style={{marginBottom: '0px'}}>
        <h7 className='dadQuote'>
            {randomQuote.quote}
          </h7>
          </Typography>
        </Paper>

      <div className="grid" style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} className='promoPics' style={{maxWidth: '90%'}}>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_175046229~2.jpg" alt="Promo Image 1" style={{borderRadius: '5px'}} />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_175714056-EDIT.jpg" alt="Promo Image 2" style={{borderRadius: '5px'}} />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_181156135.PORTRAIT-EDIT.jpg" alt="Promo Image 3" style={{borderRadius: '5px'}} />
          </Grid>
        </Grid>

        
      </div>
    </div>
  );
}

export default LandingPage;
