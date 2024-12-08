import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { RootState } from '../store';
import { setActivity } from './activitySlice';

interface User {
  uid: string;
  email: string | null;
  photoURL: string | null;
  firstName: string | null;
  lastName: string | null;
  mailingAddress: string | null;
  phone: string | null;
}
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isNewUser?: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isNewUser: false,
};

interface UpdateUserPayload {
  email?: string | null;
  photoURL?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  mailingAddress?: string | null;
  phone?: string | null;
}

const serializeUserOnSignUp = (user: FirebaseAuthTypes.User) => ({
  uid: user.uid,
  email: user.email,
  photoURL: user.photoURL,
  firstName: null,
  lastName: null,
  mailingAddress: null,
  phone: null,
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
  phone: userInfo.phone,
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
        text2: error.message.split(']')[1].trim(),
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
        text2: error.message.split(']')[1].trim(),
      });
      return rejectWithValue(error.message);
    } finally {
      dispatch(setActivity(false));
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (data: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'User not found',
        });
        return rejectWithValue('User not found');
      }
      await database().ref(`users/${user.uid}`).update(data);
      return { uid: user.uid, ...data } as User;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.message.split(']')[1].trim(),
      });
      return rejectWithValue(error.message);
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
    setNotNewUser(state) {
      state.isNewUser = false;
    },
    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
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
        state.isNewUser = true;
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
      })
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (state.isNewUser) {
          state.isNewUser = false;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        if (state.isNewUser) {
          state.isNewUser = false;
        }
      });
  },
});

export const { resetError, setNotNewUser, updateUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
