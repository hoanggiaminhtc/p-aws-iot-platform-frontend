import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || '',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const element = document.documentElement;
      if (state.theme === 'dark') {
        localStorage.setItem('theme', '');
        element.classList.remove('dark');
      } else {
        localStorage.setItem('theme', 'dark');
        element.classList.add('dark');
      }
      state.theme = state.theme === 'dark' ? '' : 'dark';
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
