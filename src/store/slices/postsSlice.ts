import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../@types/post';
import axios from 'axios';
import { RootState } from '../store';
import { Comment } from '../../@types/comment';

export interface postsState {
  isLoading: boolean;
  posts: Post[];
  comments: Comment[];
}

const initialState: postsState = {
  isLoading: false,
  posts: [],
  comments: [],
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    const randomNumber = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    try {
      const response = await axios.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
      );
      return response.data.splice(0, randomNumber);
    } catch (error) {
      return rejectWithValue({ error: 'Post fetching failed' });
    }
  },
);

export const getComments = createAsyncThunk(
  'posts/getComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Comment fetching failed' });
    }
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getComments.pending, state => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectContent = (state: RootState) => state.posts.comments;

export const selectPostsLoadingContent = (state: RootState) =>
  state.posts.isLoading;

export default postsSlice.reducer;
