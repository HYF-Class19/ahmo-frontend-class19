import GameHeader from "@/components/game/GameHeader";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import GameAlert from "@/components/shared/GameAlert";
import SelectChatTemplate from "@/components/shared/SelectChatTemplate";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IRound } from "@/models/IGame";
import { useGetGameQuery } from "@/services/gameService";
import { selectActiveChat, setGameChat } from "@/store/slices/chatSlice";
import { setRound } from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { socket } from "@/utils/socket";
import { AlertColor, CircularProgress } from "@mui/material";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RoundData from "../RoundData";
import TruthDareField from "../TruthDareField";
import WordsTextField from "../WordsTextField";
import styles from "./GameBox.module.scss";

interface GameBoxProps {}

const GameBox: React.FC<GameBoxProps> = () => {
  const [open, setOpen] = useState(true);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [alertContent, setAlertContent] = useState("");
  const selectedGame = useAppSelector(selectActiveChat);
  const userData = useAppSelector(selectUserData);
  const {
    data: game,
    isLoading,
    error,
  } = useGetGameQuery(selectedGame.activeChat || 0);
  const dispatch = useAppDispatch();
  const boxRef = useRef<any>();
  const scrollRef = useRef<any>();

  useEffect(() => {
    socket.on("getNewRound", (data: { round: IRound; gameId: number }) => {
      if (selectedGame.activeChat === data.gameId) {
        dispatch(setRound(data.round));
      }
    });

    return () => {
      socket.off("getNewRound");
    };
  }, [dispatch, selectedGame.activeChat]);

  const getAlertContent = useCallback(
    (content: string) => {
      if (!alertContent) {
        setAlertContent(content);
      }
    },
    [alertContent]
  );

  useEffect(() => {
    setSeverity("info");
    setOpen(true);
  }, [selectedGame.activeChat]);

  useEffect(() => {
    if (game) {
      dispatch(setGameChat(game));
    }
  }, [game, dispatch]);

  useEffect(() => {
    if (game?.rounds) {
      const roundIdx = game.rounds.findIndex(
        (round: IRound) => round.round_status === "active"
      );
      if (roundIdx + 1 && game.id === selectedGame.activeChat) {
        dispatch(setRound(game.rounds[roundIdx]));
      }
    }
  }, [selectedGame.activeChat, game, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedGame.rounds]);

  const activateAlert = (severity: AlertColor, content: string) => {
    setSeverity(severity);
    setAlertContent(content);
    setOpen(true);
  };

  return (
    <div className={styles.chatBoxWrapper}>
      {userData &&
      selectedGame?.members.length > 1 &&
      selectedGame.type === "game" ? (
        <>
          {alertContent && (
            <div
              className={clsx(styles.alertWrapper, open && styles.alertOpen)}
            >
              <div className={styles.alert}>
                <GameAlert
                  setAlertContent={setAlertContent}
                  open={open}
                  setOpen={setOpen}
                  severity={severity}
                >
                  {alertContent}
                </GameAlert>
              </div>
            </div>
          )}
          <GameHeader />
          {selectedGame.game !== "words" && (
            <RoundData
              getAlertContent={getAlertContent}
              gameType={game?.game}
              count={game?.rounds.length}
            />
          )}
          <div
            ref={boxRef}
            style={{ overflowY: "auto", overflowX: "hidden" }}
            className={styles.box}
          >
            {game &&
              game.rounds.map((round: IRound) => (
                <div key={round.id}>
                  <GameRound
                    scrollRef={scrollRef}
                    activateAlert={activateAlert}
                    gameType={game.game}
                    round={round}
                  />
                </div>
              ))}
            {isLoading && (
              <CircularProgress
                sx={{ width: "200px", height: "200px", color: "white" }}
                disableShrink
              />
            )}
          </div>
          {game?.game === "truth or dare" && (
            <TruthDareField
              activateAlert={activateAlert}
              chatId={selectedGame.activeChat}
            />
          )}
          {game?.game === "guess a word" && (
            <GameTextField
              nativeRound={
                game.rounds.find((r) => r.round_status === "active")!
              }
              activateAlert={activateAlert}
              chatId={selectedGame.activeChat}
            />
          )}
          {game?.game === "words" && (
            <WordsTextField
              nativeRound={
                game?.rounds.find((r) => r.round_status === "active")!
              }
              activateAlert={activateAlert}
              chatId={selectedGame.activeChat}
            />
          )}
        </>
      ) : (
        <SelectChatTemplate typeOfChat={"game"} />
      )}
    </div>
  );
};

export default GameBox;
