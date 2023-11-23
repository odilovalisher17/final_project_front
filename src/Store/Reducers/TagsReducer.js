import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: [],
  reducers: {
    updateTags: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTags } = tagsSlice.actions;

export default tagsSlice.reducer;
