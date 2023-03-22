import {api} from "@/services/api";
import {IRound} from "@/models/IGame";

export const roundService = api.injectEndpoints({
    endpoints: (build) => ({
        getRounds: build.query<IRound[], number>({
            query: (gameId: number) => ({
                url: `rounds?gameId=${gameId}`,
                method: 'GET',
            }),
            providesTags: (result) => ['Round'],
        }),
        getRound: build.query<IRound, number>({
            query: (roundId: number) => ({
                url: `rounds/${roundId}`,
                method: 'GET',
            })
        }),
        createRound: build.mutation<IRound, { riddlerId: number, chatId: number }>({
            query: (dto: { riddlerId: number, chatId: number }) => ({
                url: `rounds`,
                method: 'POST',
                body: dto,
            }),
            invalidatesTags: ['Round'],
        }),
        updateRoundData: build.mutation({
            query: (dto: {id: number, round_data?: string, round_status?: string, round_winner?: number }) => ({
                url: `rounds/${dto.id}`,
                method: 'PATCH',
                body: dto,
            }),
        }),
        createMove: build.mutation({
            query: (dto: { move_data: string, move_type: string, roundId: number}) => ({
                url: `moves`,
                method: 'POST',
                body: dto,
            })
        }),
    })
})

export const {useGetRoundsQuery, useGetRoundQuery, useCreateRoundMutation, useUpdateRoundDataMutation, useCreateMoveMutation} = roundService;