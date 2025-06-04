import { createSlice } from "@reduxjs/toolkit";
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
  }
})

export const {  } = loginSlice.actions;
export default loginSlice.reducer;
