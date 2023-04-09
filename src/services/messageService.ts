import {api} from "@/services/api";
import {createMessageDto, IMessage} from "@/models/IMessage";

const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        mutateMessage: builder.mutation<IMessage, createMessageDto>({
            query: (body) => ({
                url: '/messages',
                method: 'POST',
                body,
            })
        }),
        getMessagesByChat: builder.query<IMessage[], {chatId: number, limit: number, page: number}>({
            query: (props) => ({
                url: `/messages?chatId=${props.chatId}&limit=${props.limit}&page=${props.page}`
            }),
            providesTags: result => ['Message', 'Chat'],
        })
    })
})

export const {
    useMutateMessageMutation,
    useGetMessagesByChatQuery
} = messageApi