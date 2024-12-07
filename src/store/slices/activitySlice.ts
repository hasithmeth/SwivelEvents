import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface activityState {
  activity: boolean;
}

const initialState: activityState = {
  activity: false,
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivity: (state, action: PayloadAction<boolean>) => {
      state.activity = action.payload;
    },
  },
});

export const { setActivity } = activitySlice.actions;

export const selectActivity = (state: RootState) => state.activity.activity;

export default activitySlice.reducer;
