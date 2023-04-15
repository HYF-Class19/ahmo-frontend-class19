import { IChat } from "@/models/IChat";
import { ArrivingMessage } from "@/models/IMessage";
import { api } from "@/services/api";
import { socket } from "@/utils/socket";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchChats: builder.query<IChat[], void>({
      query: () => ({
        url: "/chats/me",
      }),
      providesTags: (result) => ["Chat", "Message"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("getMessage", (message: ArrivingMessage) => {
            updateCachedData((draft) => {
              if (draft && message) {
                const chatIndex = draft.findIndex(
                  (d) => d.id === message.chatId
                );
                if (chatIndex + 1) {
                  const chat = draft[chatIndex];
                  chat.lastMessage = message;
                  draft.splice(chatIndex, 1);
                  draft.unshift(chat);
                }
              }
            });
          });

          await cacheEntryRemoved;
          socket.off("getMessage");
        } catch (e) {}
      },
    }),
    fetchChatWithMessages: builder.query<IChat, number>({
      query: (id) => ({
        url: `/chats/${id}`,
      }),
      providesTags: (result) => ["Message", "Chat"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("getMessage", (message: ArrivingMessage) => {
            updateCachedData((draft) => {
              if (draft && message) {
                if (draft.id === message.chatId) {
                  draft?.messages?.push(message);
                }
              }
            });
          });
          await cacheEntryRemoved;
          socket.off("getMessage");
        } catch (e) {}
      },
    }),
    getChatByType: builder.query<IChat[], string>({
      query: (type) => ({
        url: `/chats?type=${type}&query=`,
      }),
    }),
    createGroup: builder.mutation<
      IChat,
      { type: string; name?: string; members: string }
    >({
      query: (body) => ({
        url: "/chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),
    removeMember: builder.mutation<void, number>({
      query: (memberId) => ({
        url: `/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation<void, number>({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat", "Message"],
    }),
    updateChat: builder.mutation<void, { chatId: number; image_url?: string }>({
      query: ({ chatId, image_url }) => ({
        url: `/chats/${chatId}`,
        method: "PATCH",
        body: { image_url },
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useFetchChatsQuery,
  useFetchChatWithMessagesQuery,
  useCreateGroupMutation,
  useGetChatByTypeQuery,
  useRemoveMemberMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatApi;
