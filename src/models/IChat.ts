import {IUser} from "@/models/IUser";
import {IMessage} from "@/models/IMessage";
import {IRound} from "@/models/IGame";

export type IChat = {
    id: number;
    name: string;
    type: "game" | "group" | "direct";
    admin: IUser;
    members: IMember[];
    messages: IMessage[];
    lastMessage: IMessage | null;
    createdAt: string;
    game: string | null;
    rounds: IRound[];

}

export type IMember = {
    id: number;
    user: IUser;
    chat: IChat;
    score: number;
}