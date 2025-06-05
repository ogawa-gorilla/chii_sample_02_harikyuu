import { Reservation } from "@/app/types/reservation";
import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../types/role";

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations:  [
    {
      id: 1,
      date: '2025-06-04',
      client: '大野 次郎',
      time: '11:00',
      duration: 1,
      status: '予約済',
      staff: {
        id: '1',
        name: '山田',
        email: 'yama@example.com',
        role: Role.STAFF,
        password: 'password',
        themeColor: '#4B000F',
      }
    }
  ]  
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {}
})

export const {  } = reservationSlice.actions;

export default reservationSlice.reducer;
