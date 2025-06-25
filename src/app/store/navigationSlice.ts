import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigationAction } from '../types/NavigationAction'
import { Page } from '../types/Page'
import { RootState } from './store'

interface NavigationState {
    pageStack: Page[]
    lastAction: NavigationAction
}

const initialState: NavigationState = {
    pageStack: [Page.HOME],
    lastAction: NavigationAction.MOVE_TO,
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<Page>) => {
            state.pageStack = [action.payload]
            state.lastAction = NavigationAction.MOVE_TO
        },
        pushPage: (state, action: PayloadAction<Page>) => {
            state.pageStack.push(action.payload)
            state.lastAction = NavigationAction.PUSH
        },
        popPage: (state) => {
            state.pageStack.pop()
            state.lastAction = NavigationAction.POP
        },
    },
})

export const canBack = createSelector(
    (state: RootState) => state.navigation.pageStack,
    (pageStack) => pageStack.length > 1
)

export const { setCurrentPage, pushPage, popPage } = navigationSlice.actions
export default navigationSlice.reducer
