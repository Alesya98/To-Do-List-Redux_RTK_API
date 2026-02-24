import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [{
  id: crypto.randomUUID(), title: 'React+Redux+RTK', isCompleted: false
}]}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action) {
      state.value.push({
          id: crypto.randomUUID(), title: action.payload, isCompleted: false
      })
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
        state.value = state.value.map((item) => {
          return item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        }
          
        )
    },
    clear(state, action) {
        state.value = state.value.filter((item) => item.id !== action.payload)
    }
  },
  selectors: {
    selectAllTasks: (sliceState) => sliceState.value
    
  }
})

export const { add, get, remove, check, edit, clear} = taskSlice.actions
export const {selectAllTasks} = taskSlice.selectors
export default taskSlice.reducer