import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  res: "all",
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter(state, action) {
      state.res = action.payload
    },
  },
  selectors: {
    selectFilter: (sliceState) => sliceState.res
  }
})

export const { filter} = filterSlice.actions
export const {selectFilter} = filterSlice.selectors
export default filterSlice.reducer