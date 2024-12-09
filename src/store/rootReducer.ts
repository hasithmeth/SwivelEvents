import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import activitySlice from './slices/activitySlice';
import imagesSlice from './slices/imagesSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  activity: activitySlice,
  image: imagesSlice,
});
