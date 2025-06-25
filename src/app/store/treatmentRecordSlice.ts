import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TREATMENT_RECORD_TESTDATA } from '../testdata/treatmentRecordTestData'
import {
    TreatmentRecord,
    TreatmentRecordSearchConditions,
} from '../types/treatmentRecord'
import { RootState } from './store'

interface TreatmentRecordState {
    records: TreatmentRecord[]
    searchConditions: TreatmentRecordSearchConditions
    recordIdOnView: string | null
    recordDraft: TreatmentRecord
}

const INITIAL_SEARCH_CONDITIONS: TreatmentRecordSearchConditions = {
    staffId: 'all',
    searchText: '',
}

const initialState: TreatmentRecordState = {
    records: TREATMENT_RECORD_TESTDATA,
    searchConditions: INITIAL_SEARCH_CONDITIONS,
    recordIdOnView: null,
    recordDraft: {
        id: '',
        client: '',
        staffId: '',
        date: '',
        content: '',
        attached_images: [],
    },
}

export const treatmentRecordSlice = createSlice({
    name: 'treatmentRecord',
    initialState,
    reducers: {
        resetSearchConditions: (state) => {
            state.searchConditions = INITIAL_SEARCH_CONDITIONS
        },
        updateSearchConditions: (
            state,
            action: PayloadAction<TreatmentRecordSearchConditions>
        ) => {
            state.searchConditions = action.payload
        },
        setRecordOnView: (state, action: PayloadAction<string>) => {
            state.recordIdOnView = action.payload
        },
        setRecordDraft: (state, action: PayloadAction<TreatmentRecord>) => {
            state.recordDraft = action.payload
        },
        updateRecordDraft: (
            state,
            action: PayloadAction<Partial<TreatmentRecord>>
        ) => {
            state.recordDraft = {
                ...state.recordDraft,
                ...action.payload,
            }
        },
        updateRecord: (state, action: PayloadAction<TreatmentRecord>) => {
            state.records = state.records.map((record) =>
                record.id === action.payload.id ? action.payload : record
            )
        },
    },
})

export const {
    resetSearchConditions,
    updateSearchConditions,
    setRecordOnView,
    setRecordDraft,
    updateRecordDraft,
    updateRecord,
} = treatmentRecordSlice.actions

const selectAllRecords = (state: RootState) => state.treatmentRecords.records
const selectSearchConditions = (state: RootState) =>
    state.treatmentRecords.searchConditions

export const filterTreatmentRecords = createSelector(
    [selectAllRecords, selectSearchConditions],
    (records, searchConditions) =>
        records.filter((record: TreatmentRecord) => {
            const isStaffMatch =
                searchConditions.staffId === 'all' ||
                record.staffId === searchConditions.staffId
            const isSearchMatch =
                searchConditions.searchText === '' ||
                record.client.includes(searchConditions.searchText) ||
                record.content.includes(searchConditions.searchText) ||
                record.date.includes(searchConditions.searchText)
            return isStaffMatch && isSearchMatch
        })
)

export default treatmentRecordSlice.reducer
