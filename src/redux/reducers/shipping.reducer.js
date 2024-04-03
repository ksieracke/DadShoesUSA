import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const customerEmail = (state = '', action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_EMAIL':
            return action.payload;
        default:
            return state;
  }
};

const shippingName = (state = '', action) => {
    switch (action.type) {
        case 'SET_SHIPPING_NAME':
            return action.payload;
        default:
            return state;
    }
};

const shippingStreetAddress = (state = '', action) => {
    switch (action.type) {
        case 'SET_SHIPPING_STREET_ADDRESS':
            return action.payload;
        default:
            return state;
    }
};

const shippingCity = (state = '', action) => {
    switch (action.type) {
        case 'SET_SHIPPING_CITY':
            return action.payload;
        default:
            return state;
    }
};

const shippingState = (state = '', action) => {
    switch (action.type) {
        case 'SET_SHIPPING_STATE':
            return action.payload;
        default:
            return state;
    }
};

const shippingZipCode = (state = '', action) => {
    switch (action.type) {
        case 'SET_SHIPPING_ZIP_CODE':
            return action.payload;
        default:
            return state;
    }
};


// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
    customerEmail,
    shippingName,
    shippingStreetAddress,
    shippingCity,
    shippingState,
    shippingZipCode,
});
