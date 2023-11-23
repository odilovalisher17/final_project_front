import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    updateItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateItems } = itemsSlice.actions;

export default itemsSlice.reducer;
