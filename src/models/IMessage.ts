import {IChat} from "@/models/IChat";
import {IUser} from "@/models/IUser";

export type IMessage = {
    id: number;
    text: string;
    chat?: IChat;
    sender: IUser;
    createdAt: Date;
}

export type ArrivingMessage = {
    id: number;
    text: string;
    chatId: number;
    sender: IUser;
    createdAt: Date;
}

export type createMessageDto = {
    text: string;
    chatId: number;
}
