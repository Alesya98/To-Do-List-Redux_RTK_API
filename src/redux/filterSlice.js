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
})

export const { filter} = filterSlice.actions
export default filterSlice.reducer