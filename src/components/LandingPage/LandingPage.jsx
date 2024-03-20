import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//import './LandingPage.css';

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

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            {randomQuote.quote}
          </p>

        </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
