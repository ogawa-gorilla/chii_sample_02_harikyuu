import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EDIT_LOG_TESTDATA } from '../testdata/editLog'
import {
    EditLog,
    EditLogSearchConditions,
    EditLogTarget,
} from '../types/EditLog'

interface editLogState {
    editLogs: EditLog[]
    searchConditions: EditLogSearchConditions
}

const initialState: editLogState = {
    editLogs: EDIT_LOG_TESTDATA,
    searchConditions: {
        target: EditLogTarget.RESERVATION,
        startDate: '',
        endDate: '',
        searchText: '',
        staffId: 'all',
    },
}

export const editLogSlice = createSlice({
    name: 'editLog',
    initialState,
    reducers: {
        addEditLog: (state, action: PayloadAction<EditLog>) => {
            state.editLogs.push(action.payload)
        },
        setSearchConditions: (
            state,
            action: PayloadAction<EditLogSearchConditions>
        ) => {
            state.searchConditions = action.payload
        },
    },
})

export const { addEditLog, setSearchConditions } = editLogSlice.actions
export default editLogSlice.reducer
