import { Shift } from '@/app/types/shift'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SHIFT_TESTDATA } from '../components/testdata/shiftTestData'
import { TemporalHoliday } from '../types/temporalHoliday'
import { RootState } from './store'

interface ShiftState {
    shifts: Shift[]
    temporalHolidays: TemporalHoliday[]
}

const initialState: ShiftState = {
    shifts: SHIFT_TESTDATA,
    temporalHolidays: [{ date: '2025-06-07', name: '店長出張' }],
}

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        editShift: (state, action: PayloadAction<Partial<Shift>>) => {
            const targetIndex = state.shifts.findIndex(
                (shift) => shift.id === action.payload.id
            )
            if (targetIndex !== -1) {
                state.shifts[targetIndex] = {
                    ...state.shifts[targetIndex],
                    ...action.payload,
                }
            }
        },
    },
})

export const selectShiftsByStaffId = createSelector(
    [
        (state: RootState) => state.shift.shifts,
        (_: RootState, staffId: string) => staffId,
    ],
    (shifts, staffId) =>
        shifts.filter((shift: Shift) => shift.staffId === staffId)
)

export const { editShift } = shiftSlice.actions

export default shiftSlice.reducer
