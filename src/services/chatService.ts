import {api} from "@/services/api";
import {IChat} from "@/models/IChat";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchChats: builder.query<IChat[], void>({
            query: () => ({
                url: '/chats/me',
            }),
        }),
        fetchChatWithMessages: builder.query<IChat, number>({
            query: (id) => ({
                url: `/chats/${id}`,
            }),
            providesTags: result => ['Message', 'Chat']
        })
    })
})

export const {
    useFetchChatsQuery,
    useFetchChatWithMessagesQuery
} = chatApi