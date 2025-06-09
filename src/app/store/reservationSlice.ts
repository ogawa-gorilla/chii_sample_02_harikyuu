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
    setSelectedReservation: (state, action: PayloadAction<Reservation>) => {
      state.selectedReservation = action.payload;
    }
  }
})

export const { 
  setDraft,
  createReservation,
  setSelectedReservation
 } = reservationSlice.actions;

export default reservationSlice.reducer;
function uuidv4(): number {
  throw new Error("Function not implemented.");
}

