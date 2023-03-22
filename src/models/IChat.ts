import {IUser} from "@/models/IUser";
import {IMessage} from "@/models/IMessage";

export type IChat = {
    id: number;
    name: string;
    type: string;
    admin: IUser;
    members: IMember[];
    messages: IMessage[];
    lastMessage: IMessage | null;
}

export type IMember = {
    id: number;
    user: IUser;
    chat: IChat;
}