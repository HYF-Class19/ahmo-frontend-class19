import { useAppSelector } from "@/hooks/useAppHooks";
import { IMember } from "@/models/IChat";
import { IRound } from "@/models/IGame";
import { useCreateMoveMutation } from "@/services/roundServive";
import { selectActiveChat } from "@/store/slices/chatSlice";
import { selectActiveRound } from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { socket } from "@/utils/socket";
import { CircularProgress, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import GameInput from "../GameInput";
import styles from "../GameTextField/GameTextField.module.scss";

interface WordsTextFieldProps {
  chatId: number;
  activateAlert: Function;
  nativeRound: IRound;
}

const WordsTextField: React.FC<WordsTextFieldProps> = ({
  chatId,
  activateAlert,
  nativeRound,
}) => {
  const [moveData, setMoveData] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const userData = useAppSelector(selectUserData);
  const [createMove, { isLoading }] = useCreateMoveMutation();
  const activeGame = useAppSelector(selectActiveChat);
  const activeRound = useAppSelector(selectActiveRound);

  const sendResponse = async () => {
    const moves = nativeRound.moves;
    const last_word =
      moves.length > 0 ? moves[moves.length - 1].move_data : null;

    if (moveData) {
      const result = await createMove({
        move_data: moveData,
        move_type: "answer",
        roundId: activeRound.id,
        last_word,
      });
      // @ts-ignore
      const move = result.data;

      if (move?.correct) {
        const receivers = activeGame.members.map((m: IMember) => m.user.id);
        socket.emit("sendMove", { ...move, chatId, receivers });
        setErrorMessage("");
        setMoveData("");
      } else {
        setErrorMessage(move?.error);
        activateAlert("error", move?.error);
      }
    }
  };

  const isMyTurn = () => {
    if (activeRound.moves?.length > 0) {
      const lastMove = activeRound.moves[activeRound.moves.length - 1];
      return lastMove.player.id !== userData?.id;
    } else {
      return activeRound.riddler?.id === userData?.id;
    }
  };

  return (
    <div className={styles.wrapper}>
      {userData &&
        activeRound &&
        (isMyTurn() ? (
          <div className={styles.textfield}>
            <GameInput
              value={moveData}
              onChange={(e: any) => setMoveData(e.target.value)}
              name={"move"}
              label={"Name a word"}
            />
            <div onClick={() => sendResponse()} className={styles.btnSection}>
              {!isLoading ? (
                <IconButton>
                  <Image
                    src="/img/send.svg"
                    width="30"
                    height="30"
                    alt={"Send icon"}
                  />
                </IconButton>
              ) : (
                <CircularProgress color="warning" />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.textInfo}>
            <h4>we are waiting for your opponents word</h4>
          </div>
        ))}
    </div>
  );
};

export default WordsTextField;
