import { createSlice } from '@reduxjs/toolkit'
import { addTasks, checkTask, clearTask, editTask, getTasks, removeTask } from '../api/taskAPI'


const initialState = { value: []}
// const initialState = { value: [], loading: false}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectAllTasks: (sliceState) => sliceState.value
    
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.value = action.payload
    });

    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.value.push(action.payload)
    });

    builder.addCase(removeTask.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.value = state.value.filter(item => item.id !== action.payload.id)
 });

      builder.addCase(checkTask.fulfilled, (state, action) => {
          state.value = state.value.map(item => 
              item.id === action.payload[0].id ? {...item, isCompleted: !item.isCompleted }: item)
      });

      builder.addCase(editTask.fulfilled, (state, action) => {
        state.value = state.value.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)
      })
   
      builder.addCase(clearTask.fulfilled, (state,action) => {
        state.value = state.value.filter(item => item.id !== action.payload.id)
      })
  }
})

export const { add, get, remove, check, edit, clear} = taskSlice.actions
export const {selectAllTasks} = taskSlice.selectors
export default taskSlice.reducer