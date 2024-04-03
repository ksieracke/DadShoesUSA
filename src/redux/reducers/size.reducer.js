const sizeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SIZE':
            console.log('in size reducer');
            return action.payload;
        default:
            return state;
    }
};

export default sizeReducer;