import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;