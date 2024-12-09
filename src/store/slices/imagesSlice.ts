import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
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

export const getTopImages = createAsyncThunk('images/getImages', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = (await response.json()) as Photo[];
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error!',
      text2: 'Image fetching failed',
    });
  }
});

export const getBottomImages = createAsyncThunk(
  'images/getImagesBottom',
  async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const data = (await response.json()) as Photo[];
      return data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Image fetching failed',
      });
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
        if (action.payload) {
          state.topImages = action.payload.slice(0, 10);
        }
      })
      .addCase(getTopImages.rejected, state => {
        state.isTopLoading = false;
      })
      .addCase(getBottomImages.pending, state => {
        state.isBottomLoading = true;
      })
      .addCase(getBottomImages.fulfilled, (state, action) => {
        state.isBottomLoading = false;
        if (action.payload) {
          state.bottomImages = action.payload.slice(0, 10);
        }
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
