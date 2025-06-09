import { Reservation, ReservationDraft } from "@/app/types/reservation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RESERVATION_TESTDATA } from "../components/testdata/reservationTestData";

interface ReservationState {
  reservations: Reservation[];
  reservationDraft: ReservationDraft | null;
}

const initialState: ReservationState = {
  reservations: RESERVATION_TESTDATA,
  reservationDraft: null
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<ReservationDraft>) => {
      state.reservationDraft = action.payload;
    }
  }
})

export const { 
  createDraft
 } = reservationSlice.actions;

export default reservationSlice.reducer;
