import {IMember} from "@/models/IChat";

export const getReceivers = (members: IMember[], myId: number) => {
 return members.filter((member: IMember) => member.user.id !== myId).map((member: IMember) => member.user.id)
}