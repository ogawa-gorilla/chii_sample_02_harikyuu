import { Shift, ShiftDraft, ShiftTemplate } from '@/app/types/shift'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { SHIFT_TESTDATA } from '../components/testdata/shiftTestData'
import { TemporalHoliday } from '../types/temporalHoliday'
import { RootState } from './store'

interface ShiftState {
    shifts: Shift[]
    shiftDraft: {
        drafts: ShiftDraft[]
        targetDates: string[]
    }
    temporalHolidays: TemporalHoliday[]
    shiftTemplates: ShiftTemplate[]
}

const initialState: ShiftState = {
    shifts: SHIFT_TESTDATA,
    shiftDraft: {
        drafts: [],
        targetDates: [],
    },
    temporalHolidays: [{ date: '2025-06-07', name: '店長出張' }],
    shiftTemplates: [
        // 店長は全部出勤
        {
            id: '1',
            userId: '1',
            configPerDay: [
                [
                    '0',
                    {
                        day: '0',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 日
                [
                    '3',
                    {
                        day: '3',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 水
                [
                    '4',
                    {
                        day: '4',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 木
                [
                    '5',
                    {
                        day: '5',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 金
                [
                    '6',
                    {
                        day: '6',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 土
            ],
        },
        // 佐藤：水金休み
        {
            id: '2',
            userId: '2',
            configPerDay: [
                [
                    '0',
                    {
                        day: '0',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 日
                [
                    '4',
                    {
                        day: '4',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 木
                [
                    '6',
                    {
                        day: '6',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 土
            ],
        },
        // 山田：木休み
        {
            id: '3',
            userId: '3',
            configPerDay: [
                [
                    '0',
                    {
                        day: '0',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 日
                [
                    '3',
                    {
                        day: '3',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 水
                [
                    '5',
                    {
                        day: '5',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 金
                [
                    '6',
                    {
                        day: '6',
                        times: [{ startTime: '09:00', endTime: '18:00' }],
                    },
                ], // 土
            ],
        },
    ],
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
        deleteShift: (state, action: PayloadAction<string>) => {
            state.shifts = state.shifts.filter(
                (shift) => shift.id !== action.payload
            )
        },
        setShiftDrafts: (state, action: PayloadAction<ShiftDraft[]>) => {
            state.shiftDraft.drafts = action.payload
        },
        updateShiftDraft: (state, action: PayloadAction<ShiftDraft>) => {
            const targetIndex = state.shiftDraft.drafts.findIndex(
                (draft) => draft.id === action.payload.id
            )
            if (targetIndex !== -1) {
                state.shiftDraft.drafts[targetIndex] = action.payload
            } else {
                state.shiftDraft.drafts.push(action.payload)
            }
        },
        deleteShiftDraft: (state, action: PayloadAction<string>) => {
            state.shiftDraft.drafts = state.shiftDraft.drafts.filter(
                (draft) => draft.id !== action.payload
            )
        },
        clearShiftDrafts: (state) => {
            state.shiftDraft.drafts = []
        },
        setTargetDates: (state, action: PayloadAction<string[]>) => {
            state.shiftDraft.targetDates = action.payload
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

export const selectShiftDraftsForDay = createSelector(
    [
        (state: RootState) => state.shift.shiftDraft.drafts,
        (_: RootState, date: string) => date,
    ],
    (shiftDrafts, date) =>
        shiftDrafts.filter((draft: ShiftDraft) => draft.date === date)
)

export const getMonthlyShifts = createSelector(
    [
        (state: RootState) => state.shift.shifts,
        (_: RootState, month: number) => month,
        (_: RootState, month: number, staffId: string) => staffId,
    ],
    (shifts, month, staffId) =>
        shifts.filter(
            (shift: Shift) =>
                dayjs(shift.date).month() === month && shift.staffId === staffId
        )
)

export const selectAllShiftDrafts = (state: RootState) =>
    state.shift.shiftDraft.drafts

export const {
    editShift,
    deleteShift,
    setShiftDrafts,
    updateShiftDraft,
    deleteShiftDraft,
    clearShiftDrafts,
    setTargetDates,
} = shiftSlice.actions

export default shiftSlice.reducer
