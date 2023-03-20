import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/models/IUser";
import {IChat, IMember} from "@/models/IChat";
import {IMessage} from "@/models/IMessage";
import {io} from "socket.io-client";

interface chatState {
    activeChat: number | null;
    messages: IMessage[];
    admin: IUser | null;
    members: IMember[];
}

const initialState: chatState = {
    activeChat: null,
    messages: [],
    admin: null,
    members: [],
}
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<IChat>) => {
            state.activeChat = action.payload.id
            state.members = action.payload.members
            state.admin = action.payload.admin
        },
        loadMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
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

export const {setActiveChat, addMessage, loadMessages} = chatSlice.actions

export const selectActiveChat = (state: any) => state.chat

export const chatReducer = chatSlice.reducer