export const getLastMessage = (chat: any) => {
    const length = chat.attributes.messages.data.length
    return chat.attributes.messages.data[length - 1]?.attributes.text
}

export const getChatSnippet = (chats: any, myId: number) => {
    let snippet = chats.reduce((acc: any, chat: any, i: number) => acc + i === chats.length - 1 || chats.length === 1 ? chat.name : chat.name + ', ', '')
    return snippet
}

export const getChatMemberName = (chat: any, myId: number) => {
    return chat.members.find((member: any) => member.user.id !== myId)!.user.fullName
}