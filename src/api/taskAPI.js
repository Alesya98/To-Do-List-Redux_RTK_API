import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTasks = createAsyncThunk("tasks/get", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTasks = createAsyncThunk(
  "tasks/add",
  async (newTitle, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("ошибка добавления");
    }
  },
);

export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка удаления");
    }
  },
);

export const checkTask = createAsyncThunk(
  "tasks/checked",
  async ({ id }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Ошибка check");
    }
  },
);

export const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ id, newTitle }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const clearTask = createAsyncThunk(
  "tasks/clear",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
