import React, {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';

function UserPage() {
  const user = useSelector((store) => store.user);

  const [updating, setUpdating] = useState(false);
  const [emailValue, setEmailValue] = useState(user.email);
  const [streetAddressValue, setStreetAddressValue] = useState(user.street_address);
  const [cityValue, setCityValue] = useState(user.city);
  const [stateValue, setStateValue] = useState(user.state);
  const [zipCodeValue, setZipCodeValue] = useState(user.zip_code);


  function changeUpdating(){
    setUpdating(!updating);
  }

  async function updateUserInfo() {
    try {
      const updatedUserInfo = {
        email: emailValue,
        streetAddress: streetAddressValue,
        city: cityValue,
        state: stateValue,
        zipCode: zipCodeValue,
      };

      await axios.put('/api/user/update', updatedUserInfo);
      window.location.reload();

      changeUpdating();
    } catch (error) {
      console.log('Error updating user information:', error);
      // Handle error
    }
  }

  return (
    <div className="container">
      <h2>Hello, {user.first_name}!</h2>
      <p>Account Details:</p>
      <p>Name: {user.first_name+" "+ user.last_name}</p>
      {!updating &&(
        <>
      <p>Email: {user.email}</p>
      <p>Address: {user.street_address+", "+user.city+", "+user.state+" "+ user.zip_code}</p>
      <Button onClick={changeUpdating} variant="contained"
        color="primary"
        style={{
            whiteSpace: 'pre-line',
            wordWrap: 'break-word',
            maxWidth: '200px',
            backgroundColor: '#24496b',
            transition: 'font-size 0.3s ease', // Add transition for smooth effect
            fontSize: '1rem', // Set initial font size
        }}
        onMouseEnter={(e) => e.target.style.fontSize = '1.1rem'} // Increase font size on hover
        onMouseLeave={(e) => e.target.style.fontSize = '1rem'} // Reset font size on mouse leave
    >Update Info</Button>
      </>
    )}
    {updating &&(
      <>
      <p>Email: <input value={emailValue} onChange={(e) => setEmailValue(e.target.value)}></input></p>
      <p>Street Address:<input value={streetAddressValue} onChange={(e) => setStreetAddressValue(e.target.value)}></input></p>
          <p>City:<input value={cityValue} onChange={(e) => setCityValue(e.target.value)}></input></p>
          <p>State:<input value={stateValue} onChange={(e) => setStateValue(e.target.value)}></input></p>
          <p>Zip:<input value={zipCodeValue} onChange={(e) => setZipCodeValue(e.target.value)}></input></p>

      <button onClick={()=>{
          changeUpdating()
          updateUserInfo();
      }}>Save</button>
      </>
    )}

      <LogOutButton className="btn" style={{
            whiteSpace: 'pre-line',
            wordWrap: 'break-word',
            maxWidth: '200px',
            transition: 'font-size 0.3s ease', // Add transition for smooth effect
            fontSize: '1rem', // Set initial font size
        }}/>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
