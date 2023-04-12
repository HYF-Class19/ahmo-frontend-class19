import {IMember} from "@/models/IChat";
import { IMessage } from "@/models/IMessage";
import { IUser } from "@/models/IUser";

export const getReceivers = (myId: number, members?: IMember[], ) => {
 return members?.filter((member: IMember) => member.user.id !== myId).map((member: IMember) => member.user.id) || []
}

export const getDirectName = (myId: number, members: IMember[]): IUser => {
    return members.find(member => member.user.id !== myId)!.user
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


export const getLastMessage = (lastMessage: IMessage | null = null, myId?: number) => {
    if(!lastMessage) {
       return  ''
    }
    const firstpart = lastMessage.sender?.id === myId ? 'You: ' : lastMessage.sender.fullName + ': '
    const length = lastMessage.text.length
    if(length > 18) {
        return firstpart + lastMessage.text.slice(0,15) + '...'
    } else {
        return firstpart + lastMessage.text.slice(0,18)
    }
}