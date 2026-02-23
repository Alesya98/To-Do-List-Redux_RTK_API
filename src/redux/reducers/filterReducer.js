const initialValue = {
  res: "all",
};

export const filterReducer = (store = initialValue, action) => {
  switch (action.type) {
    case "filter":
      return { ...store, res: action.payload };

    default:
      return store;
  }
};
