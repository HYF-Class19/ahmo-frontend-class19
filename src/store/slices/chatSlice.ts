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
            // state.rounds?.forEach(round => {
            //     if(round.moves) {
            //         round.moves = round.moves || []
            //     }
            // })
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
        updateRoundData: (state, action: PayloadAction<{round_data: string, id: number}>) => {
            const round = state.rounds.find(round => round.id === action.payload.id)
            if (round) {
                round.round_data = action.payload.round_data
            }
        },
        updateRoundStatus: (state, action: PayloadAction<{round_status: string, id: number, winner: number}>) => {
            const round = state.rounds.find(round => round.id === action.payload.id)
            if (round) {
                round.round_status = action.payload.round_status
                round.round_winner = action.payload.winner
            }
        },
        addMove: (state, action: PayloadAction<IMove>) => {
            // const round = state.rounds.find(round => round.id === action.payload.round.id)
            // if (round) {
            //     round.moves.push(action.payload)
            // }
        }
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

export const {setActiveChat, addMessage, loadMessages, addMove, addRound, setGameChat, updateRoundStatus, updateRoundData} = chatSlice.actions

export const selectActiveChat = (state: any) => state.chat

export const selectActiveRound = (state: any) => state.chat.rounds?.find((round: IRound) => round.round_status === "active")

export const selectMembers = (state: any) => state.chat.members

export const chatReducer = chatSlice.reducer