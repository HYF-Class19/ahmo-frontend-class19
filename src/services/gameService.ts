import {api} from "@/services/api";
import {CreateChatDto, IGame} from "@/models/IGame";

export const gameService = api.injectEndpoints({
    endpoints: (build) => ({
        getGame: build.query<IGame, number>({
            query: (id: number) => ({
                url: `chats/${id}`,
                method: 'GET',
            }),
        }),
        getGames: build.query({
            query: () => ({
                url: `chats/me?game=true`,
                method: 'GET',
            }),
            providesTags: (result) => ['Game'],
        }),
        createGame: build.mutation<IGame, CreateChatDto>({
            query: (dto: CreateChatDto) => ({
                url: `chats`,
                method: 'POST',
                body: dto,
            }),
            invalidatesTags: ['Game'],
        }),
    })
})

export const {useGetGameQuery, useGetGamesQuery, useCreateGameMutation} = gameService;