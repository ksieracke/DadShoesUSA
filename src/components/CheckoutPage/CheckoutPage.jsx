import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function CheckoutPage() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const storeSize=useSelector((store) => store.size);
    const shipName=useSelector((store)=> store.shipping.shippingName)
    const shipStreet=useSelector((store)=> store.shipping.shippingStreetAddress)


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

    useEffect(() => {
        console.log(storeSize);
        
    }, []);

    return (
        <>
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
                
            </form>
        </>
    );
}

export default CheckoutPage;
