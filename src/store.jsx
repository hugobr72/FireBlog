import { configureStore } from '@reduxjs/toolkit';
import dark, { toogle } from './slices/darkMode';
import userSlice from './slices/userSlice';


export const store = configureStore({
  reducer: {
    mode: dark,
    toogle: toogle,
    userData: userSlice,
  },
});


