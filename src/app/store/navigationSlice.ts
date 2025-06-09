import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../types/Page";

interface NavigationState {
  pageStack: Page[];
}

const initialState: NavigationState = {
  pageStack: [Page.HOME],
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.pageStack = [action.payload];
    },
    pushPage: (state, action: PayloadAction<Page>) => {
      state.pageStack.push(action.payload);
    },
    popPage: (state) => {
      state.pageStack.pop();
    }
  }
})

export const { setCurrentPage } = navigationSlice.actions;
export default navigationSlice.reducer;
