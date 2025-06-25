import { Shift, ShiftDraft, ShiftTemplate } from '@/app/types/shift'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import { SHIFT_TEMPLATE_TESTDATA } from '../testdata/shiftTemplateTestData'
import { SHIFT_TESTDATA } from '../testdata/shiftTestData'
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
    shiftTemplates: SHIFT_TEMPLATE_TESTDATA,
}

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        setShiftDrafts: (state, action: PayloadAction<ShiftDraft[]>) => {
            state.shiftDraft.drafts = action.payload
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
        clearHistory: (state) => {
            state.shiftDraft.history = []
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
        createShiftTemplate: (state, action: PayloadAction<string>) => {
            const newTemplate: ShiftTemplate = {
                id: v4(),
                userId: action.payload,
                shiftDrafts: [],
            }
            state.shiftTemplates.push(newTemplate)
        },
        updateShiftTemplate: (state, action: PayloadAction<ShiftTemplate>) => {
            const targetIndex = state.shiftTemplates.findIndex(
                (template) => template.id === action.payload.id
            )
            if (targetIndex !== -1) {
                state.shiftTemplates[targetIndex] = action.payload
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

export const selectShiftsInPeriod = createSelector(
    [
        (state: RootState) => state.shift.shifts,
        (_: RootState, startDate: string, endDate: string) => startDate,
        (_: RootState, startDate: string, endDate: string) => endDate,
        (_: RootState, startDate: string, endDate: string, staffId: string) =>
            staffId,
    ],
    (shifts, startDate, endDate, staffId) =>
        shifts.filter(
            (shift: Shift) =>
                dayjs(shift.date) >= dayjs(startDate) &&
                dayjs(shift.date) <= dayjs(endDate) &&
                shift.staffId === staffId
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
    clearHistory,
    pushHistory,
    undo,
    createShiftTemplate,
    updateShiftTemplate,
} = shiftSlice.actions

export default shiftSlice.reducer
