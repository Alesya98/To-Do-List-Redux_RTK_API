export const createAddTaskActions = (value) => ({
  type: "add",
  payload: value,
});
export const displayTasksActions = (value) => ({ type: "get", payload: value });
export const deleteTasksActions = (value) => ({
  type: "delete",
  payload: value,
});
export const cheсkedTasksActions = (value) => ({
  type: "chek",
  payload: value,
});
export const editTasksActions = (id, newTitle) => ({
  type: "edit",
  payload: id,
  newTitle,
});
export const filterTasksActions = (value) => ({
  type: "filter",
  payload: value,
});

export const clearActiveActions = (value) => ({
  type: "clear",
  payload: value,
});
