import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      // @ts-ignore 
      state.user = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Anonymous",
          }
        : null;
      state.loaded = true;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;