import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

import { HYDRATE } from 'next-redux-wrapper';
import {IUser} from "@/models/IUser";

export interface UserState {
    data?: IUser | null;
}
const initialState: UserState = {
    data: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload;
        },
        deleteUserData: (state) => {
            state.data = null
        },
        updateUserData: (state, action: PayloadAction<{fullName?: string, image_url?: string}>) => {
            const {fullName, image_url} = action.payload
            if(state.data) {
                if(fullName) {
                    state.data.fullName = fullName
                } else if(image_url) {
                    state.data.image_url = image_url
                }
            }          
        }
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

export const { setUserData, deleteUserData, updateUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;


export const userReducer = userSlice.reducer;