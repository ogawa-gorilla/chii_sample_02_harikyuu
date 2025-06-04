import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../types/Page";

interface NavigationState {
  currentPage: Page;
}

const initialState: NavigationState = {
  currentPage: Page.HOME,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    }
  }
})

export const { setCurrentPage } = navigationSlice.actions;
export default navigationSlice.reducer;
