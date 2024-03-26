import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* uploadToDb(action) {
    try {
      console.log('in upload saga');
      console.log(action.payload);
      yield axios.post('/api/upload', action.payload);
      
      
    } catch (error) {
      console.log('Error with upload:', error);
      yield put({ type: 'UPLOAD_FAILED' });
    }
  }
  



function* uploadSaga() {
    yield takeLatest('UPLOAD_TO_DB', uploadToDb);
}

export default uploadSaga;