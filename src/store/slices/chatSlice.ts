import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/models/IUser";
import {IChat, IMember} from "@/models/IChat";
import {IMessage} from "@/models/IMessage";
import {io} from "socket.io-client";
import {IGame, IMove, IRound} from "@/models/IGame";

interface chatState {
    activeChat: number | null;
    messages: IMessage[];
    admin: IUser | null;
    members: IMember[];
    type: "game" | "group" | "direct" | null;
    rounds: IRound[];
    game: string | null;
}

const initialState: chatState = {
    activeChat: null,
    messages: [],
    admin: null,
    members: [],
    type: null,
    rounds: [],
    game: null,
}
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<IChat>) => {
            state.activeChat = action.payload.id
            state.members = action.payload.members
            state.admin = action.payload.admin
            state.type = action.payload.type
        },
        setGameChat: (state, action: PayloadAction<IChat>) => {
            state.activeChat = action.payload.id
            state.members = action.payload.members
            state.admin = action.payload.admin
            state.type = action.payload.type
            state.rounds = action.payload.rounds || []
            state.game = action.payload.game
        },
        loadMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload)
        },
        addRound: (state, action: PayloadAction<any>) => {
            state.rounds.push(action.payload)
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

export const {setActiveChat, addMessage, loadMessages, addRound, setGameChat} = chatSlice.actions

export const selectActiveChat = (state: any) => state.chat
export const selectMembers = (state: any) => state.chat.members

export const chatReducer = chatSlice.reducer