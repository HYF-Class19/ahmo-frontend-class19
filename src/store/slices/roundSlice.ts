import {IGame, IMove, IRound} from "@/models/IGame";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {round} from "@popperjs/core/lib/utils/math";
import {RootState} from "@/store";
import {IUser} from "@/models/IUser";

export interface roundState {
    id: number |  null
    round_data: string | null;
    round_status: string | null;
    round_winner: number | null;
    riddler: IUser | null;
    attempt: number;
    moves: IMove[];
    submiting: number;
}

const initialState: roundState = {
    id: null,
    round_data: null,
    round_status: 'active',
    round_winner: null,
    moves: [],
    riddler: null,
    attempt: 0,
    submiting: 0
}

export const roundSlice = createSlice({
    name: 'round',
    initialState,
    reducers: {
        setRound: (state, action: PayloadAction<IRound>) => {
            state.id = action.payload.id
            state.round_data = action.payload.round_data
            state.round_status = action.payload.round_status
            state.round_winner = action.payload.round_winner
            state.riddler = action.payload.riddler
            state.moves = action.payload.moves
            state.attempt = action.payload.attempt
            state.submiting = action.payload.submiting
        },
        addRoundData: (state, action: PayloadAction<string>) => {
            state.round_data = action.payload
        },
        updateRoundStatus: (state, action: PayloadAction<{round_status: string, winner: number}>) => {
            state.round_status = action.payload.round_status
            state.round_winner = action.payload.winner
        },
        addMove: (state, action: PayloadAction<IMove>) => {
            state.moves.push(action.payload)
        },
        addSubmitting: (state) => {
            state.submiting++
        },
        addAttempt: (state) => {
            state.attempt++;
        }
    }
})

export const {setRound, addRoundData, updateRoundStatus, addMove, addSubmitting, addAttempt} = roundSlice.actions

export const selectActiveRound = (state: RootState) => state.round

export const roundReducer = roundSlice.reducer