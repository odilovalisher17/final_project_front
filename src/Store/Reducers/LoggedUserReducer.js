import { createSlice } from "@reduxjs/toolkit";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: "",
  reducers: {
    addLoggedUser: (state, action) => {
      return action.payload;
    },

    removeLoggedUser: (state, action) => {
      return "";
    },
  },
});

export const { addLoggedUser, removeLoggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
