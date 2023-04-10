import {IMember} from "@/models/IChat";
import { IMessage } from "@/models/IMessage";

export const getReceivers = (myId: number, members?: IMember[], ) => {
 return members?.filter((member: IMember) => member.user.id !== myId).map((member: IMember) => member.user.id) || []
}

export const isAvatarUnvisible = (myId: number, message: IMessage, messages: IMessage[], idx: number) => {
    if(idx + 1 >= messages.length) {
        return false
    }
    
    const senderId = message.sender.id    
    if(myId === senderId) {
        return messages[idx + 1].sender.id === myId
    } else {
        return messages[idx + 1].sender.id === senderId
    }
}