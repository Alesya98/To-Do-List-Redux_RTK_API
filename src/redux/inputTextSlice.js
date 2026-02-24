import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: ''}

const inputTextSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    cheng(state, action) {
      state.value = action.payload
    },
        zero(state) {
      state.value = ''
    },
    
  },
})

export const { cheng, zero} = inputTextSlice.actions
export default inputTextSlice.reducer