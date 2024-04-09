import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';

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
    <div className="container">
      <h1>{heading}</h1>
      <h8><i>Step into Wisdom</i></h8>


      <img className='bigImage' src="../../../public/images/PXL_20240407_181338163.PORTRAIT (1).jpg" alt="Big Image" style={{ marginBottom: '10px', marginTop: '3px' }} />
      
      <Paper elevation={4} className='quotePaper' style={{ textAlign: 'center', width: '100%', padding: '10px', backgroundColor: '#e0ecfb', marginTop: '2px', marginBottom: '10px' }}>
          <h2 className='dadQuote'>
            {randomQuote.quote}
          </h2>
        </Paper>

      <div className="grid">
        <Grid container spacing={2} className='promoPics'>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_175046229~2.jpg" alt="Promo Image 1" />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_175714056-EDIT.jpg" alt="Promo Image 2" />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/PXL_20240407_181156135.PORTRAIT-EDIT.jpg" alt="Promo Image 3" />
          </Grid>
        </Grid>

        
      </div>
    </div>
  );
}

export default LandingPage;
