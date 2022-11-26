import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase/api';
import { onAuthStateChanged } from 'firebase/auth'


const initialState = {
  user: {}
}

export const login = createAsyncThunk("auth/login", async (user) => {
  user = JSON.stringify(user)
  return JSON.parse(user)
});

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (state) => {
    state.user = user
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },

})


export const { reset } = userSlice.actions;
export default userSlice.reducer;