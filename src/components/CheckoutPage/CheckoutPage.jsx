import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

import './CheckoutPage.css';

function CheckoutPage() {
  const dispatch = useDispatch();
  const storeSize = useSelector((store) => store.size);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  // State variables for form fields
  const [shippingName, setShippingName] = useState(
    user ? `${user.first_name} ${user.last_name}` : ""
  );
  const [customerEmail, setCustomerEmail] = useState(user ? user.email : "");
  const [shippingStreetAddress, setShippingStreetAddress] = useState(
    user ? user.street_address : ""
  );
  const [shippingCity, setShippingCity] = useState(user ? user.city : "");
  const [shippingState, setShippingState] = useState(user ? user.state : "");
  const [shippingZip, setShippingZip] = useState(user ? user.zip_code : "");

  // Event handlers for form field changes
  const handleNameChange = (e) => {
    setShippingName(e.target.value);
    dispatch({
      type: "SET_SHIPPING_NAME",
      payload: e.target.value,
    });
  };
  const handleEmailChange = (e) => {
    setCustomerEmail(e.target.value);
    dispatch({
      type: "SET_CUSTOMER_EMAIL",
      payload: e.target.value,
    });
  };
  const handleAddressChange = (e) => {
    setShippingStreetAddress(e.target.value);
    dispatch({
      type: "SET_SHIPPING_STREET_ADDRESS",
      payload: e.target.value,
    });
  };
  const handleCityChange = (e) => {
    setShippingCity(e.target.value);
    dispatch({
      type: "SET_SHIPPING_CITY",
      payload: e.target.value,
    });
  };
  const handleStateChange = (e) => {
    setShippingState(e.target.value);
    dispatch({
      type: "SET_SHIPPING_STATE",
      payload: e.target.value,
    });
  };
  const handleZipChange = (e) => {
    setShippingZip(e.target.value);
    dispatch({
      type: "SET_SHIPPING_ZIP_CODE",
      payload: e.target.value,
    });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: `Dad Shoes Size ${storeSize}`,
            amount: {
              currency_code: "USD",
              value: 65,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An Error occurred with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful. Your order id is--", orderID);
      history.push("/thankyou");
    }
  }, [success]);

  return (
    <Container maxWidth="md">
        <Grid container spacing={2} >
        <Grid item xs={12} >
            <Typography variant="h4" gutterBottom>
                <h1 style={{marginTop:'1px', marginLeft: '20px'}}>Checkout</h1>
            </Typography>
            <Typography variant="body1" paragraph>
            You are purchasing a size <b><u>{parseFloat(storeSize)}</u></b> pair of Dad Shoes
            </Typography>
            <Typography variant="body1" paragraph style={{marginLeft: '125px'}} >
                <h2>Total: $65</h2>
            </Typography>
            <br></br>
            <Typography variant="body1" paragraph>
                Please enter/verify the shipping address below
            </Typography>
        </Grid>


        
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <Paper style={{padding:'10px', backgroundColor:'#e0ecfb', textAlign: 'center'}}>
            <Typography variant="h6" gutterBottom>
              Shipping:
            </Typography>
            <form>
              <TextField
                fullWidth
                id="customer-email"
                label="Purchaser Email"
                variant="outlined"
                value={customerEmail}
                onChange={handleEmailChange}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                fullWidth
                id="shipping-name"
                label="Dad's Name"
                variant="outlined"
                value={shippingName}
                onChange={handleNameChange}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                fullWidth
                id="shipping-address"
                label="Dad's Street Address"
                variant="outlined"
                value={shippingStreetAddress}
                onChange={handleAddressChange}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                fullWidth
                id="shipping-city"
                label="Dad's City"
                variant="outlined"
                value={shippingCity}
                onChange={handleCityChange}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                fullWidth
                id="shipping-state"
                label="Dad's State"
                variant="outlined"
                value={shippingState}
                onChange={handleStateChange}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                fullWidth
                id="shipping-zip"
                label="Dad's Zip Code"
                variant="outlined"
                value={shippingZip}
                onChange={handleZipChange}
                style={{ marginBottom: '16px' }}
              />
              
              <p className="paypalInstructions">
                <b>You do not need a PayPal account, you can pay via Credit/Debit Card</b>
              </p>
              <div className="paypal-buttons-container">
                <PayPalScriptProvider
                  options={{ "client-id": 'Ada8jcq__0SFyYKCAJRDqsQYIw2jhzuAUdod_inu3msjgn0CSY_Jga5qseOYQOLARI1GU1UbF1AQ3QNu' }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </PayPalScriptProvider>
              </div>
            </form>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Box mt={2} display="flex" justifyContent="center">
            <img src="../../../public/images/PXL_20240409_012914784.PORTRAIT-EDIT.jpg" alt="Promo Image 1" style={{ maxWidth: '60%', height: 'auto', borderRadius: '5px', marginTop: '-180px'}} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;
