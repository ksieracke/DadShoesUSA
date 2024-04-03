import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CheckoutPage() {
    const user = useSelector((store) => store.user);
    const storeSize=useSelector((store) => store.size);


    // State variables for form fields
    const [shippingName, setShippingName] = useState(user ? `${user.first_name} ${user.last_name}` : "");
    const [customerEmail, setCustomerEmail] = useState(user ? user.email : "");
    const [shippingStreetAddress, setShippingStreetAddress] = useState(user ? user.street_address : "");
    const [shippingCity, setShippingCity] = useState(user ? user.city : "");
    const [shippingState, setShippingState] = useState(user ? user.state : "");
    const [shippingZip, setShippingZip] = useState(user ? user.zip_code : "");

    // Event handlers for form field changes
    const handleNameChange = (e) => setShippingName(e.target.value);
    const handleEmailChange = (e) => setCustomerEmail(e.target.value);
    const handleAddressChange = (e) => setShippingStreetAddress(e.target.value);
    const handleCityChange = (e) => setShippingCity(e.target.value);
    const handleStateChange = (e) => setShippingState(e.target.value);
    const handleZipChange = (e) => setShippingZip(e.target.value);

    useEffect(() => {
        console.log(storeSize);
        
    }, []);

    return (
        <>
            <p>Checkout</p>

            <h3>Shipping</h3>

            <form>
                <label>
                    Name:
                    <input type="text" value={shippingName} onChange={handleNameChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={customerEmail} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Street Address:
                    <input type="text" value={shippingStreetAddress} onChange={handleAddressChange} />
                </label>
                <br />
                <label>
                    City:
                    <input type="text" value={shippingCity} onChange={handleCityChange} />
                </label>
                <br />
                <label>
                    State:
                    <input type="text" value={shippingState} onChange={handleStateChange} />
                </label>
                <br />
                <label>
                    Zip Code:
                    <input type="text" value={shippingZip} onChange={handleZipChange} />
                </label>
            </form>
        </>
    );
}

export default CheckoutPage;
