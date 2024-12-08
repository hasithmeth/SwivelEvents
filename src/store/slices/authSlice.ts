import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { RootState } from '../store';
import Toast from 'react-native-toast-message';
import { setActivity } from './activitySlice';
import database from '@react-native-firebase/database';

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    photoURL: string | null;
    firstName: string | null;
    lastName: string | null;
    mailingAddress: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const serializeUserOnSignUp = (user: FirebaseAuthTypes.User) => ({
  uid: user.uid,
  email: user.email,
  photoURL: user.photoURL,
  firstName: null,
  lastName: null,
  mailingAddress: null,
});

const serializeUserOnSignIn = (
  user: FirebaseAuthTypes.User,
  userInfo: any,
) => ({
  uid: user.uid,
  email: user.email,
  photoURL: user.photoURL,
  firstName: userInfo.firstName,
  lastName: userInfo.lastName,
  mailingAddress: userInfo.mailingAddress,
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await database().ref(`users/${userCredential.user.uid}`).set({
        email,
        createdAt: new Date().toISOString(),
      });

      return serializeUserOnSignUp(userCredential.user);
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Please check email and password',
      });
      return rejectWithValue(error.message);
    } finally {
      dispatch(setActivity(false));
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const snapshot = await database()
        .ref(`users/${userCredential.user.uid}`)
        .once('value');
      const userInfo = snapshot.val();

      return serializeUserOnSignIn(userCredential.user, userInfo);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check email and password',
      });
      return rejectWithValue(error.message);
    } finally {
      dispatch(setActivity(false));
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await auth().signOut();
      return null; // Clear the user on sign-out
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, state => {
        state.user = null;
      });
  },
});

export const { resetError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
