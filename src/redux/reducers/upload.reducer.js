const uploadReducer = (state = {}, action) => {
    switch (action.type) {
      case 'UPLOAD_TO_DB':
        console.log('in upload reducer');
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default uploadReducer;
  