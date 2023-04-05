import {api} from "@/services/api";
import {IChat} from "@/models/IChat";
import { socket } from "@/utils/socket";
import { ArrivingMessage, IMessage } from "@/models/IMessage";

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchChats: builder.query<IChat[], void>({
            query: () => ({
                url: '/chats/me',
            }),
            providesTags: result => ['Message','Chat'],
            async onCacheEntryAdded(arg, {cacheDataLoaded, cacheEntryRemoved, updateCachedData}) {
                try {
                    await cacheDataLoaded;
                    socket.on('getMessage', (message: ArrivingMessage) => {
                        updateCachedData((draft) => {
                            if(draft && message) {
                                const chatIndex = draft.findIndex(d => d.id === message.chatId)
                                if(chatIndex) {
                                    console.log(123)
                                    const chat = draft[chatIndex]
                                    chat.lastMessage = message
                                    draft.splice(chatIndex, 1)
                                    draft.unshift(chat)
                                }
                            }
                        });
                      })
                    await cacheEntryRemoved;
                    socket.off('getMessage');
                } catch (e) {
                }
            }
        }),
        fetchChatWithMessages: builder.query<IChat, number>({
            query: (id) => ({
                url: `/chats/${id}`,
            }),
            providesTags: result => ['Message', 'Chat'],
            async onCacheEntryAdded(arg, {cacheDataLoaded, cacheEntryRemoved, updateCachedData}) {
                try {
                    await cacheDataLoaded;
                    socket.on('getMessage', (message: ArrivingMessage) => {
                        updateCachedData((draft) => {
                            if(draft && message) {
                                if(draft.id === message.chatId) {
                                    draft?.messages?.push(message);
                                }
                            }
                        });
                      })
                    await cacheEntryRemoved;
                    socket.off('getMessage');
                } catch (e) {
                }
            }
        }),
        getChatByType: builder.query<IChat[], string>({
            query: (type) => ({
                url: `/chats?type=${type}&query=`
            }),
        }),
        createGroup: builder.mutation<IChat, {type: string, name: string, members: string }>({
            query: (body) => ({
                url: '/chats',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Chat'],
        }),
    }),
    overrideExisting: true,
})

export const {
    useFetchChatsQuery,
    useFetchChatWithMessagesQuery,
    useCreateGroupMutation,
    useGetChatByTypeQuery
} = chatApi