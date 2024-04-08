const pendingCaptionStartIndex = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PENDING_INDEX':
            console.log('in pending caption reducer');
            return action.payload;
        default:
            return state;
    }
};

export default pendingCaptionStartIndex;