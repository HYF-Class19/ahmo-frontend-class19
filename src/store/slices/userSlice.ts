import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";

import { IUser } from "@/models/IUser";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  data?: IUser | null;
  isAuth: boolean | null;
}
const initialState: UserState = {
  data: null,
  isAuth: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
    deleteUserData: (state) => {
      state.data = null;
      state.isAuth = false;
    },
    updateUserData: (
      state,
      action: PayloadAction<{
        fullName?: string;
        image_url?: string;
        bio?: string;
      }>
    ) => {
      const { fullName, image_url, bio } = action.payload;
      if (state.data) {
        if (fullName) {
          state.data.fullName = fullName;
        } else if (image_url) {
          state.data.image_url = image_url;
        } else if (bio) {
          state.data.bio = bio;
        }
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserData, deleteUserData, updateUserData, setIsAuth } =
  userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;
export const selectIsAuth = (state: RootState) => state.user.isAuth;

export const userReducer = userSlice.reducer;
