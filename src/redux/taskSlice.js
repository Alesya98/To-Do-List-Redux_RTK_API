import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: []}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action) {
      state.value.push(action.payload)
    },
    get(state, action) {
      state.value = action.payload
    },
    remove(state, action) {
      state.value = state.value.filter(item => item.id !== action.payload)
    },
    check(state, action) {
      state.value = state.value.map(item => item.id === action.payload ? {...item, isCompleted: !item.isCompleted} : item)
    },
    edit(state, action) {
        state.value = state.value.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.editText }
            : item
        )
    },
    clear(state, action) {
        state.value = state.value.filter((item) => item.id !== action.payload)
    }

  },
})

export const { add, get, remove, check, edit, clear} = taskSlice.actions
export default taskSlice.reducer