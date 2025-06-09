import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import navigationReducer from './navigationSlice';
import reservationReducer from './reservationSlice';
import shiftReducer from './shiftSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        login: loginReducer,
        user: userReducer,
        reservation: reservationReducer,
        shift: shiftReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;