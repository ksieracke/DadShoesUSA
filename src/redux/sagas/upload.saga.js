import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* uploadToDb(action) {
    try {
      // passes the username and password from the payload to the server
      console.log(action.payload);
      yield axios.post('/api/upload', action.payload);
      
      
    } catch (error) {
      console.log('Error with user registration:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
    }
  }
  



function* uploadSaga() {
    yield takeLatest('UPLOAD_TO_DB', uploadToDb);
}

export default uploadSaga;