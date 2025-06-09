import { Reservation, ReservationDraft } from "@/app/types/reservation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RESERVATION_TESTDATA } from "../components/testdata/reservationTestData";

interface ReservationState {
  reservations: Reservation[];
  reservationDraft: ReservationDraft | null;
  selectedReservation: Reservation | null;
}

const initialState: ReservationState = {
  reservations: RESERVATION_TESTDATA,
  reservationDraft: null,
  selectedReservation: null
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<ReservationDraft>) => {
      state.reservationDraft = action.payload;
    },
    createReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const targetIndex = state.reservations.findIndex(reservation => reservation.id === action.payload.id);
      if (targetIndex !== -1) {
        state.reservations[targetIndex] = action.payload;
      }
    },
    setSelectedReservation: (state, action: PayloadAction<Reservation>) => {
      state.selectedReservation = action.payload;
    }
  }
})

export const { 
  setDraft,
  createReservation,
  updateReservation,
  setSelectedReservation
 } = reservationSlice.actions;

export default reservationSlice.reducer;


