import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer } from '../slices/user';
import { reducer as locationReducer } from '../slices/location';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer
});

export default rootReducer;
