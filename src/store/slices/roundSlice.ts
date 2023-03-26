import {IGame, IMove, IRound} from "@/models/IGame";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {round} from "@popperjs/core/lib/utils/math";
import {RootState} from "@/store";
import {IUser} from "@/models/IUser";

interface roundState {
    id: number |  null
    round_data: string | null;
    round_status: string | null;
    round_winner: number | null;
    riddler: IUser | null;
    moves: IMove[];
}

const initialState: roundState = {
    id: null,
    round_data: null,
    round_status: 'active',
    round_winner: null,
    moves: [],
    riddler: null,
}

export const roundSlice = createSlice({
    name: 'round',
    initialState,
    reducers: {
        setRound: (state, action: PayloadAction<IRound>) => {
            console.log(1)
            state.id = action.payload.id
            state.round_data = action.payload.round_data
            state.round_status = action.payload.round_status
            state.round_winner = action.payload.round_winner
            state.riddler = action.payload.riddler
            state.moves = action.payload.moves
        },
        addRoundData: (state, action: PayloadAction<string>) => {
            state.round_data = action.payload
        },
        updateRoundStatus: (state, action: PayloadAction<{round_status: string, id: number, winner: number}>) => {
            state.round_status = action.payload.round_status
            state.round_winner = action.payload.winner
        },
        addMove: (state, action: PayloadAction<IMove>) => {
            console.log(action.payload)
            state.moves.push(action.payload)
        }
    }
})

export const {setRound, addRoundData, updateRoundStatus, addMove} = roundSlice.actions

export const selectActiveRound = (state: RootState) => state.round

export const roundReducer = roundSlice.reducer