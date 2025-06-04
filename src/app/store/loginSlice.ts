import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { RootState } from "./store";

interface LoginState {
  user: User | null
}

const initialState: LoginState = {
  user: null,
}

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
})

export const isLoggedin = createSelector(
  (state: RootState) => state.login.user,
  (user) => user !== null
);

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
