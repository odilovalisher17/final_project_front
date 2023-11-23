import { createSlice } from "@reduxjs/toolkit";

export const modeChangerSlice = createSlice({
  name: "modeChanger",
  initialState: "light",
  reducers: {
    changeMode: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeMode } = modeChangerSlice.actions;

export default modeChangerSlice.reducer;
