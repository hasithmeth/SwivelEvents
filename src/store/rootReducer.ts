import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import activitySlice from './slices/activitySlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  activity: activitySlice,
});
