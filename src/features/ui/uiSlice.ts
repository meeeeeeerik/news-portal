import { createSlice } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
  darkMode: localStorage.getItem('np_dark') !== 'false',
  searchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('np_dark', String(state.darkMode));
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
  },
});

export const { toggleDarkMode, setSearchOpen } = uiSlice.actions;
export default uiSlice.reducer;
