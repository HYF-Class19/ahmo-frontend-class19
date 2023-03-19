import {IChat} from "@/models/IChat";
import {IUser} from "@/models/IUser";

export type IMessage = {
    id: number;
    text: string;
    chat: IChat;
    sender: IUser;
}

export type createMessageDto = {
    text: string;
    chatId: number;
}