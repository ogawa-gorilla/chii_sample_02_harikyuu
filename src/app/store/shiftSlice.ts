import { Shift, ShiftDraft, ShiftTemplate } from '@/app/types/shift'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { SHIFT_TESTDATA } from '../components/testdata/shiftTestData'
import { TemporalHoliday } from '../types/temporalHoliday'
import { TimeIdentifier } from '../types/timeIdentifier'
import { RootState } from './store'

interface ShiftState {
    shifts: Shift[]
    shiftDraft: {
        drafts: ShiftDraft[]
        targetDates: TimeIdentifier[]
        history: ShiftDraft[][]
    }
    temporalHolidays: TemporalHoliday[]
    shiftTemplates: ShiftTemplate[]
}

const initialState: ShiftState = {
    shifts: SHIFT_TESTDATA,
    shiftDraft: {
        drafts: [],
        targetDates: [],
        history: [],
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
        setShiftDrafts: (state, action: PayloadAction<ShiftDraft[]>) => {
            state.shiftDraft.drafts = action.payload
            state.shiftDraft.history = []
        },
        updateOrCreateShift: (state, action: PayloadAction<Shift>) => {
            const targetIndex = state.shifts.findIndex(
                (shift) => shift.id === action.payload.id
            )
            if (targetIndex === -1) {
                state.shifts.push(action.payload)
            } else {
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
            state.shiftDraft.history = []
        },
        setTargetDates: (state, action: PayloadAction<TimeIdentifier[]>) => {
            state.shiftDraft.targetDates = action.payload
        },
        pushHistory: (state) => {
            state.shiftDraft.history.push(state.shiftDraft.drafts)
            if (state.shiftDraft.history.length > 20) {
                state.shiftDraft.history.shift()
            }
        },
        undo: (state) => {
            if (state.shiftDraft.history.length > 1) {
                state.shiftDraft.history.pop()
                if (state.shiftDraft.history.length > 0) {
                    const target =
                        state.shiftDraft.history[
                            state.shiftDraft.history.length - 1
                        ]
                    state.shiftDraft.drafts = target
                } else {
                    state.shiftDraft.drafts = []
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

export const selectShiftDraftsForDay = createSelector(
    [
        (state: RootState) => state.shift.shiftDraft.drafts,
        (_: RootState, date: TimeIdentifier) => date,
    ],
    (shiftDrafts, date) =>
        shiftDrafts.filter(
            (draft: ShiftDraft) => draft.date.value === date.value
        )
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

export const historyLength = createSelector(
    (state: RootState) => state.shift.shiftDraft.history,
    (history) => history.length
)

export const selectAllShiftDrafts = (state: RootState) =>
    state.shift.shiftDraft.drafts

export const {
    updateOrCreateShift,
    deleteShift,
    setShiftDrafts,
    updateShiftDraft,
    deleteShiftDraft,
    clearShiftDrafts,
    setTargetDates,
    pushHistory,
    undo,
} = shiftSlice.actions

export default shiftSlice.reducer
