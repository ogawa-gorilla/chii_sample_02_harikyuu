import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EDIT_LOG_TESTDATA } from '../testdata/editLog'
import { EditLog, EditLogSearchConditions } from '../types/EditLog'

interface editLogState {
    editLogs: EditLog[]
    searchConditions: EditLogSearchConditions
}

const initialState: editLogState = {
    editLogs: EDIT_LOG_TESTDATA,
    searchConditions: {
        target: null,
        staffId: 'all',
        startDate: '',
        endDate: '',
    },
}

export const editLogSlice = createSlice({
    name: 'editLog',
    initialState,
    reducers: {
        addEditLog: (state, action: PayloadAction<EditLog>) => {
            state.editLogs.push(action.payload)
        },
        deleteEditLog: (state, action: PayloadAction<string>) => {
            state.editLogs = state.editLogs.filter(
                (log) => log.id !== action.payload
            )
        },
        setSearchConditions: (
            state,
            action: PayloadAction<EditLogSearchConditions>
        ) => {
            state.searchConditions = action.payload
        },
    },
})

export const { addEditLog, deleteEditLog, setSearchConditions } =
    editLogSlice.actions
export default editLogSlice.reducer
