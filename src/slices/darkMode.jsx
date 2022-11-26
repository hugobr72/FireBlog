import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dark: false
}

export const dark = createSlice({
  name: 'dark',
  initialState,
  reducers: {
    toogle: (state) => {
      state.dark = !state.dark
    },
  },
})

export const { toogle } = dark.actions
export default dark.reducer;