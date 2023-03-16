import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

interface chatState {
    activeChat: number | null;
    messages: any[];
    users: any[];
}

const initialState: chatState = {
    activeChat: null,
    messages: [],
    users: []
}
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload.id
            state.messages = action.payload.attributes.messages.data
            state.users = action.payload.attributes.chat_members.data
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.chat,
            };
        },
    },
})

export const {setActiveChat, addMessage} = chatSlice.actions

export const selectActiveChat = (state: any) => state.chat

export const chatReducer = chatSlice.reducer