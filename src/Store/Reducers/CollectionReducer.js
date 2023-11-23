import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collections",
  initialState: [],
  reducers: {
    updateCollections: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
