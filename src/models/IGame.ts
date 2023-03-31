import {IUser} from "@/models/IUser";
import {IMember} from "@/models/IChat";

export type IGame = {
    id: number;
    type: 'game'
    name: string;
    game: string;
    createdAt: string;
    admin: IUser;
    members: IMember[];
    rounds: IRound[];
}

export type IRound = {
    id: number;
    round_data: string;
    round_status: string;
    round_winner: number;
    game: IGame;
    riddler: IUser;
    attempt: number;
    moves: IMove[];
}

export type IMove = {
    id: number;
    move_data: string;
    move_type: string;
    round: IRound;
    player: IUser;
    createdAt: string;
    correct: boolean;
}

export type ArrivingMove = {
    id: number;
    move_data: string;
    move_type: string;
    correct: boolean;
    player: IUser;
    createdAt: string;
    round: IRound;
    chatId: number;
}

export type CreateChatDto = {
    name: string;
    type: string;
    members: string;
    game: string;
}