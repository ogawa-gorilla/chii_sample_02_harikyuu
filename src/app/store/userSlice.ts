import { createSelector, createSlice } from '@reduxjs/toolkit'
import { USER_TESTDATA } from '../testdata/userTestData'
import { Role } from '../types/role'
import { User } from '../types/user'
import { RootState } from './store'

interface UserState {
    users: User[]
}

const initialState: UserState = {
    users: USER_TESTDATA,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

export const getStaffs = createSelector(
    (state: RootState) => state.user.users,
    (users) =>
        users.filter(
            (user) => user.role === Role.STAFF || user.role === Role.MANAGER
        )
)

export const {} = userSlice.actions
export default userSlice.reducer
