import {api} from "@/services/api";
import {createMessageDto, IMessage} from "@/models/IMessage";

const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        mutateMessage: builder.mutation<IMessage, createMessageDto>({
            query: (body) => ({
                url: '/messages',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {
    useMutateMessageMutation
} = messageApi