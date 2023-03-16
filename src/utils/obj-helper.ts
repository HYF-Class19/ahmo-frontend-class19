export const getLastMessage = (chat: any) => {
    const length = chat.attributes.messages.data.length
    return chat.attributes.messages.data[length - 1]?.attributes.text
}

export const getChatSnippet = (chats: any, myId: number) => {
    let snippet = chats.reduce((acc: string, curr: any, i: number) => i !== chats.length - 1 ? acc + getChatMember(myId, curr).attributes.user.data.attributes.username + ', ' : acc + getChatMember(myId, curr).attributes.user.data.attributes.username, '')
    return snippet
}

export const getChatMember = (myId: number, chat: any) => {
    return chat.attributes.chat_members.data.find((member: any) => member.id !== myId)
}