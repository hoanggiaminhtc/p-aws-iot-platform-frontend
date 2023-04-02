import { configureStore } from '@reduxjs/toolkit';

import userReducer from '~/redux/slice/userSlice';
import themeSlice from '~/redux/slice/themeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeSlice,
  },
});

export default store;
