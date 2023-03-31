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
            providesTags: result => ['Chat']
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
                      });
                    
                    await cacheEntryRemoved;
                    socket.off('getMessage');
                } catch (e) {
                }
            }
        }),
        createGroup: builder.mutation<IChat, {type: string, name: string, members: string }>({
            query: (body) => ({
                url: '/chats',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Chat'],
        })
    })
})

export const {
    useFetchChatsQuery,
    useFetchChatWithMessagesQuery,
    useCreateGroupMutation
} = chatApi