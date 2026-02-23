const initialValue = {
  value: [],
};

const taskReducer = (store = initialValue, action) => {
  // console.log(store.value);
  switch (action.type) {
    case "add":
      return {
        ...store,
        value: [...store.value, action.payload],
      };

    case "get":
      return { ...store, value: action.payload };

    case "delete":
      return {
        ...store,
        value: store.value.filter((item) => item.id !== action.payload),
      };

    case "chek":
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      };

    case "edit":
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.editText }
            : item,
        ),
      };

    case "clear":
      return {
        ...store,
        value: store.value.filter((item) => item.id !== action.payload),
      };

    default:
      return store;
  }
};

export default taskReducer;
