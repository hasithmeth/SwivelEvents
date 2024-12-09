import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Photo } from '../../@types/photo';
import { RootState } from '../store';

export interface imageState {
  isTopLoading: boolean;
  isBottomLoading: boolean;
  topImages: Photo[];
  bottomImages: Photo[];
}

const initialState: imageState = {
  isTopLoading: false,
  isBottomLoading: false,
  topImages: [],
  bottomImages: [],
};

export const getTopImages = createAsyncThunk(
  'images/getImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Photo[]>(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const data = response.data.slice(0, 10);
      return data;
    } catch (error) {
      return rejectWithValue({ error: 'Image fetching failed' });
    }
  },
);

export const getBottomImages = createAsyncThunk(
  'images/getImagesBottom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Photo[]>(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const data = response.data.slice(0, 10);
      return data;
    } catch (error) {
      return rejectWithValue({ error: 'Image fetching failed' });
    }
  },
);

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopImages.pending, state => {
        state.isTopLoading = true;
      })
      .addCase(getTopImages.fulfilled, (state, action) => {
        state.isTopLoading = false;
        state.topImages = action.payload;
      })
      .addCase(getTopImages.rejected, state => {
        state.isTopLoading = false;
      })
      .addCase(getBottomImages.pending, state => {
        state.isBottomLoading = true;
      })
      .addCase(getBottomImages.fulfilled, (state, action) => {
        state.isBottomLoading = false;
        state.bottomImages = action.payload;
      })
      .addCase(getBottomImages.rejected, state => {
        state.isBottomLoading = false;
      });
  },
});

export const selectTopImages = (state: RootState) => state.image.topImages;

export const selectBottomImages = (state: RootState) =>
  state.image.bottomImages;

export default imagesSlice.reducer;
