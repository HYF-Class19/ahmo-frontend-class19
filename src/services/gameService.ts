import { IChat } from "@/models/IChat";
import { CreateChatDto, IGame, IRound } from "@/models/IGame";
import { IUser } from "@/models/IUser";
import { api } from "@/services/api";
import { socket } from "@/utils/socket";

export const gameService = api.injectEndpoints({
  endpoints: (build) => ({
    getGame: build.query<IChat, number>({
      query: (id: number) => ({
        url: `chats/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["Game"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          socket.on(
            "getNewRound",
            (data: {
              previousWinner: number;
              round: IRound;
              gameId: number;
            }) => {
              updateCachedData((draft) => {
                console.log(
                  "getting mew round",
                  !!draft,
                  !!data.round,
                  draft.id === data.gameId
                );
                if (draft && data.round && draft.id === data.gameId) {
                  if (draft.rounds) {
                    const activeRound = draft.rounds.find(
                      (r) => r.round_status === "active"
                    );
                    if (activeRound) {
                      activeRound.round_status = "finished";
                      activeRound.round_winner = data.previousWinner;
                    }
                    draft.rounds.push(data.round);
                  }
                }
              });
            }
          );

          socket.on("getMove", (move: any) => {
            console.log("getting before move");
            updateCachedData((draft) => {
              console.log("getting move", move, draft.id === move.chatId);
              if (draft.id === move.chatId) {
                const roundIdx = draft?.rounds?.findIndex(
                  (round) => round.id === move?.round?.id
                );
                if (roundIdx + 1) {
                  draft.rounds[roundIdx].moves?.push(move);
                  if (move.move_type === "statement") {
                    draft.rounds[roundIdx].attempt++;
                  }
                }
              }
            });
          });

          socket.on("getSubmitRound", ({ gameId: number }) => {
            updateCachedData((draft) => {
              console.log("sumbitting got");
              const roundIdx = draft?.rounds?.findIndex(
                (round) => round.round_status === "active"
              );
              if (roundIdx + 1) {
                draft.rounds[roundIdx].submiting++;
              }
            });
          });

          socket.on(
            "getUpdatedWord",
            (data: {
              player: IUser;
              round_data: string;
              roundId: number;
              gameId: number;
            }) => {
              updateCachedData((draft) => {
                console.log("getting updated word", draft.id === data.gameId);
                if (draft && draft.id === data.gameId) {
                  const roundIdx = draft?.rounds?.findIndex(
                    (round) => round.round_status === "active"
                  );
                  if (roundIdx + 1) {
                    draft.rounds[roundIdx].round_data = data.round_data;
                  }
                }
              });
            }
          );
          await cacheEntryRemoved;
          socket.off("getMove");
          socket.off("getSubmitRound");
          socket.off("getUpdatedWord");
          socket.off("getNewRound");
        } catch (e) {}
      },
    }),
    getGames: build.query<IGame[], void>({
      query: () => ({
        url: `chats/me?game=true`,
        method: "GET",
      }),
      providesTags: (result) => ["Game"],
    }),
    createGame: build.mutation<IChat, CreateChatDto>({
      query: (dto: CreateChatDto) => ({
        url: `chats`,
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useGetGameQuery, useGetGamesQuery, useCreateGameMutation } =
  gameService;
