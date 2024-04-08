import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function CheckoutPage() {
    const dispatch = useDispatch();
    const storeSize=useSelector((store)=>store.size);
    const user=useSelector((store)=>store.user);
    const history=useHistory();
    


    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // State variables for form fields
    const [shippingName, setShippingName] = useState(user ? `${user.first_name} ${user.last_name}` : "");
    const [customerEmail, setCustomerEmail] = useState(user ? user.email : "");
    const [shippingStreetAddress, setShippingStreetAddress] = useState(user ? user.street_address : "");
    const [shippingCity, setShippingCity] = useState(user ? user.city : "");
    const [shippingState, setShippingState] = useState(user ? user.state : "");
    const [shippingZip, setShippingZip] = useState(user ? user.zip_code : "");

    // Event handlers for form field changes
    const handleNameChange = (e) => {
        setShippingName(e.target.value);
        dispatch({
            type: 'SET_SHIPPING_NAME',
            payload: e.target.value,
        });
    };
    const handleEmailChange = (e) => {
        setCustomerEmail(e.target.value);
        dispatch({
            type: 'SET_CUSTOMER_EMAIL',
            payload: e.target.value,
        });
    };
    const handleAddressChange = (e) => {
        setShippingStreetAddress(e.target.value);
        dispatch({
            type: 'SET_SHIPPING_STREET_ADDRESS',
            payload: e.target.value,
        });
    };
    const handleCityChange = (e) => {
        setShippingCity(e.target.value);
        dispatch({
            type: 'SET_SHIPPING_CITY',
            payload: e.target.value,
        });
    };
    const handleStateChange = (e) => {
        setShippingState(e.target.value);
        dispatch({
            type: 'SET_SHIPPING_STATE',
            payload: e.target.value,
        });
    };
    const handleZipChange = (e) => {
        setShippingZip(e.target.value);
        dispatch({
            type: 'SET_SHIPPING_ZIP_CODE',
            payload: e.target.value,
        });
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `Dad Shoes Size ${storeSize}`,
                    amount: {
                        currency_code: "USD",
                        value: 65
                    },
                },
            ],
        }).then((orderID) => {
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
            console.log('Order successful . Your order id is--', orderID);
            history.push("/thankyou");
        }
    },[success]);


    return (
        <PayPalScriptProvider options={{ "client-id": 'Ada8jcq__0SFyYKCAJRDqsQYIw2jhzuAUdod_inu3msjgn0CSY_Jga5qseOYQOLARI1GU1UbF1AQ3QNu' }}>
            <h1>Checkout</h1>
            <p>Purchasing a size {parseFloat(storeSize)} pair of Dad Shoes</p>
            <p>Please enter/verify the shipping address below</p>



            <h3>Shipping</h3>

            <form>
                <label>
                    Purchaser Email:
                    <input type="email" value={customerEmail} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Dad's Name:
                    <input type="text" value={shippingName} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Dad's Street Address:
                    <input type="text" value={shippingStreetAddress} onChange={handleAddressChange} />
                </label>
                <br />
                <label>
                    Dad's City:
                    <input type="text" value={shippingCity} onChange={handleCityChange} />
                </label>
                <br />
                <label>
                    Dad's State:
                    <input type="text" value={shippingState} onChange={handleStateChange} />
                </label>
                <br />
                <label>
                    Dad's Zip Code:
                    <input type="text" value={shippingZip} onChange={handleZipChange} />
                </label>
                <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
            </form>
            </PayPalScriptProvider>
    );
}

export default CheckoutPage;
