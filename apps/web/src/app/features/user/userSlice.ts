import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from "app/store";

export const me = createAsyncThunk('user/me', async () => {
  const response = await fetch('http://localhost:3000/me', {
    credentials: 'include',
  });
  const data = await response.json();

  return data.user;
});

export interface userState {
  payload: any | null;
  status: string;
}

const initialState: userState = {
  payload: null,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<object>) => {
      state.payload = action.payload;
    },
    logOut: (state) => {
      state.payload = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.pending, (state) => {
      state.status = 'pendding';
    });

    builder.addCase(me.fulfilled, (state, action) => {
      state.payload = action.payload;
      state.status = 'fulfilled';
    });
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
