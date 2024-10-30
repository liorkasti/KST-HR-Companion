import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import candidatesReducer from './slices/candidates-slice';

const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
