import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import navigationReducer from './navigationSlice';

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        login: loginReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;