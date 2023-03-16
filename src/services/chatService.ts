import {api} from "@/services/api";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchChats: builder.query<any, void>({
            query: () => ({
                url: '/chats',
                params: {
                    populate: 'chat_members.user,messages.user'
                }
            }),
        })
    })
})

export const {
    useFetchChatsQuery
} = chatApi