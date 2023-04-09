import {api} from "@/services/api";
import {CreateChatDto, IGame, IMove, IRound} from "@/models/IGame";
import {IChat} from "@/models/IChat";
import { socket } from "@/utils/socket";
import { IUser } from "@/models/IUser";

export const gameService = api.injectEndpoints({
    endpoints: (build) => ({
        getGame: build.query<IChat, number>({
            query: (id: number) => ({
                url: `chats/${id}`,
                method: 'GET',
            }),
            providesTags: result => ['Game'],
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
              ) {
                try {
                  await cacheDataLoaded;
                  socket.on("getNewRound", (round: IRound) => {
                    updateCachedData((draft) => {
                      if (draft && round) {
                        if(draft.rounds) {
                            draft.rounds.push(round);
                        }
                      }
                    });
                  });
        
                  socket.on("getMove", (move: IMove) => {
                    updateCachedData((draft) => {
                      const roundIdx = draft.rounds.findIndex((round) => round.id === move?.round?.id)
                      if (roundIdx + 1) {
                          draft.rounds[roundIdx].moves?.push(move);
                          console.log('got')
                        }
                    });
                  });
        
                  socket.on("getSubmitRound", () => {
                    updateCachedData((draft) => {
                      const roundIdx = draft?.rounds?.findIndex(round => round.round_status === 'active')
                      if (roundIdx + 1) {
                        draft.rounds[roundIdx].submiting++
                      }
                    });
                  });
        
                   socket.on(
                    "getUpdatedWord",
                    (data: { player: IUser; round_data: string, roundId: number}) => {
                        updateCachedData((draft) => {
                          const roundIdx = draft.rounds.findIndex(round => round.round_status === 'active')
                            if (roundIdx + 1) {
                              draft.rounds[roundIdx].round_data = data.round_data
                            }
                          });
                    }
                  );
        
                  await cacheEntryRemoved;
                  socket.off("getMove");
                  socket.off("getNewRound");
                  socket.off("getSubmitRound");
                  socket.off('getUpdatedWord')
                } catch (e) {}
              },
        }),
        getGames: build.query<IGame[], void>({
            query: () => ({
                url: `chats/me?game=true`,
                method: 'GET',
            }),
            providesTags: (result) => ['Game'],
        }),
        createGame: build.mutation<IChat, CreateChatDto>({
            query: (dto: CreateChatDto) => ({
                url: `chats`,
                method: 'POST',
                body: dto,
            }),
            invalidatesTags: ['Chat']
        }),
    })
})

export const {useGetGameQuery, useGetGamesQuery, useCreateGameMutation} = gameService;