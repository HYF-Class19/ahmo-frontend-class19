import {IMember} from "@/models/IChat";

export const getReceivers = (myId: number, members?: IMember[], ) => {
 return members?.filter((member: IMember) => member.user.id !== myId).map((member: IMember) => member.user.id) || []
}