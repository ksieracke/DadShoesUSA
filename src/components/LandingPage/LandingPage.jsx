import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

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
      let quoteList=response.data
      console.log(quoteList);
      let randQuoteIndex = Math.floor(Math.random() * quoteList.length);
      let randomQuote = quoteList[randQuoteIndex];
      setRandomQuote(randomQuote);
      console.log('Random Quote:', randomQuote);
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
      <h2>{heading}</h2>
      <img src="../../../public/images/placeholderlandingimage.jpg"></img>

        <h2 className='dadQuote'>
          {randomQuote.quote}
        </h2>
      <div className="grid">
        <Grid container spacing={2} className='promoPics'>
          <Grid item xs={4}>
            <img src="../../../public/images/placeholder_image.jpeg" alt="Promo Image 1" />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/placeholder_image.jpeg" alt="Promo Image 2" />
          </Grid>
          <Grid item xs={4}>
            <img src="../../../public/images/placeholder_image.jpeg" alt="Promo Image 3" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LandingPage;
