import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    TreatmentRecord,
    TreatmentRecordSearchConditions,
} from '../types/treatmentRecord'
import { RootState } from './store'

interface TreatmentRecordState {
    records: TreatmentRecord[]
    searchConditions: TreatmentRecordSearchConditions
    recordIdOnView: string | null
}

const INITIAL_SEARCH_CONDITIONS: TreatmentRecordSearchConditions = {
    staffId: 'all',
    searchText: '',
}

const initialState: TreatmentRecordState = {
    records: [
        {
            id: '1',
            client: '田中 太郎',
            staffId: '1',
            date: '2025-06-01',
            content: '肩こりの鍼治療。肩甲骨まわりに反応点多数あり。',
            attached_images: [],
        },
        {
            id: '2',
            client: '鈴木 花子',
            staffId: '2',
            date: '2025-06-03',
            content: '腰痛への施術。仙腸関節周辺に重点的にアプローチ。',
            attached_images: ['2025-06-03-1.jpg'],
        },
        {
            id: '3',
            client: '佐藤 健',
            staffId: '1',
            date: '2025-06-03',
            content: '首のこり。後頚部に硬結があり。',
            attached_images: [],
        },
        {
            id: '4',
            client: '山田 真一',
            staffId: '2',
            date: '2025-05-30',
            content: '背中の張り。脊柱起立筋にアプローチ。',
            attached_images: [],
        },
        {
            id: '5',
            client: '井上 美咲',
            staffId: '1',
            date: '2025-05-29',
            content: '冷え性への対応。足首周辺に施術。',
            attached_images: [],
        },
        {
            id: '6',
            client: '中村 海斗',
            staffId: '3',
            date: '2025-05-29',
            content: 'ストレスによる不眠。頭部と耳周辺の施術。',
            attached_images: [],
        },
        {
            id: '7',
            client: '高橋 優',
            staffId: '2',
            date: '2025-06-01',
            content: '肩関節の可動域改善。',
            attached_images: [],
        },
    ],
    searchConditions: INITIAL_SEARCH_CONDITIONS,
    recordIdOnView: null,
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
    },
})

export const {
    resetSearchConditions,
    updateSearchConditions,
    setRecordOnView,
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
