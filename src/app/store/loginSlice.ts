import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";

interface LoginState {
  user: User | null
  loggedIn: boolean
}

const initialState: LoginState = {
  user: null,
  loggedIn: false,
}

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;
    }
  }
})

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;
