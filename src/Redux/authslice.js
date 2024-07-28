import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  components: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.token = action.payload;
      state.status = true;
    },

    signout: (state) => {
      state.token = null;
      state.status = false;
    },

    add: (state, action) => {
      state.components = [...state.components, action.payload];
    },

    remove: (state) => {
      state.components = [];
    },
  },
});

export const { signin, signout, add, remove } = userSlice.actions;
export default userSlice.reducer;
