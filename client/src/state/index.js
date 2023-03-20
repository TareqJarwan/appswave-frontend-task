import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "",
  wishingList: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    addToWishingList: (state, action) => {
      console.log(action.payload);
      state?.wishingList?.push(action.payload);
    },
    removeFromWishingList: (state, action) => {
      state.wishingList = state.wishingList.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { setMode, setUserId, addToWishingList, removeFromWishingList } =
  globalSlice.actions;

export default globalSlice.reducer;
