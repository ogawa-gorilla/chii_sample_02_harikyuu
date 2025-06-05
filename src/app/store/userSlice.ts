import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../types/role";
import { User } from "../types/user";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    {
      id: '1',
      name: '鈴木',
      email: 'manager@example.com',
      role: Role.MANAGER,
      password: 'suzuki',
      themeColor: '#0A192F',
    },
    {
      id: '2',
      name: '佐藤',
      email: 'sato@example.com',
      role: Role.STAFF,
      password: 'sato',
      themeColor: '#2D0B5A',
    },
    {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'yamada',
      themeColor: '#4B000F',
    },
    {
      id: '4',
      name: '上野',
      email: 'ue@example.com',
      role: Role.OFFICE,
      password: 'ueno',
      themeColor: '#014421',
    },
  ]
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export const {  } = userSlice.actions;
export default userSlice.reducer;

