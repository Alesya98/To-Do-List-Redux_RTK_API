import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getTasks = createAsyncThunk('tasks/get',async(state, thunkAPI) => {
  try {
    const store = thunkAPI.getState() //возвращает весь store
    // console.log('store:', store)
    const response = await fetch('https://todo-redev.herokuapp.com/api/todos?isCompleted=false', {
      method: 'GET',
      headers: {
           "Content-Type": "application/json",
            Authorization: `Bearer ${store.auth.token}`,
      }
    })

    const data = await response.json()
    console.log('ok')
    return data
  } catch (error) {
    console.log(error)
  }
})

const initialState = { value: []}
// const initialState = { value: [], loading: false}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action) {
      state.value.push(action.payload) 
      // const id = newTodo.id ?? Math.random().toString(36).slice(2)
      // state.value.push({id, isCompleted: false, ...newTodo})
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
    
  },
  extraReducers: (builder) => {
    // builder.addCase(getTasks.pending, (state, action) => {
    //   state.loading = true
    // })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.value = action.payload
      // state.loading = false
    })
  }
})

export const { add, get, remove, check, edit, clear} = taskSlice.actions
export const {selectAllTasks} = taskSlice.selectors
export default taskSlice.reducer