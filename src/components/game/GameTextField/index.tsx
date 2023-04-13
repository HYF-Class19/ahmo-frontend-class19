import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IMember } from "@/models/IChat";
import { IRound } from "@/models/IGame";
import {
  useCreateMoveMutation,
  useCreateRoundMutation,
  useUpdateRoundDataMutation,
} from "@/services/roundServive";
import {
  addScore,
  selectActiveChat,
  selectMembers,
} from "@/store/slices/chatSlice";
import {
  addAttempt,
  addRoundData,
  selectActiveRound,
} from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { disableNotMyTurn } from "@/utils/round-helper";
import { socket } from "@/utils/socket";
import { Button, CircularProgress, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import GameInput from "../GameInput";
import styles from "./GameTextField.module.scss";

interface GameTextFieldProps {
  chatId: number;
  activateAlert: Function;
  nativeRound: IRound;
}

const GameTextField: React.FC<GameTextFieldProps> = ({
  nativeRound,
  chatId,
  activateAlert,
}) => {
  const [moveData, setMoveData] = useState<string>("");
  const [moveType, setMoveType] = useState<string>("question");
  const [roundData, setRoundData] = useState<string>("");
  const [createMove, { isLoading }] = useCreateMoveMutation();
  const userData = useAppSelector(selectUserData);
  const members = useAppSelector(selectMembers);
  const activeGame = useAppSelector(selectActiveChat);
  const activeRound = useAppSelector(selectActiveRound);
  const [createRound] = useCreateRoundMutation();
  const [updateRoundData, { error }] = useUpdateRoundDataMutation();
  const dispatch = useAppDispatch();

  const sendResponse = async (answer?: string) => {
    if ((answer || moveData) && (moveType || answer) && activeRound) {
      const result = await createMove({
        move_data: moveData || answer,
        move_type: moveType || "answer",
        roundId: activeRound.id,
      });
      // @ts-ignore
      const move = result.data;
      if (move) {
        let immediateAttempts = activeRound.attempt;
        if (moveType === "statement") {
          dispatch(addAttempt());
          immediateAttempts++;
        }
        const receivers = activeGame.members.map((m: IMember) => m.user.id);
        socket.emit("sendMove", { ...move, chatId, receivers });
        if ((move.correct || immediateAttempts >= 3) && activeRound?.riddler) {
          let winner;
          if (move.correct) {
            winner = move.player.id;
            dispatch(addScore({ winner: move.player.id }));
            activateAlert("success", "You won this round!");
          } else {
            winner = activeRound.riddler.id;
            dispatch(addScore({ winner: activeRound.riddler.id }));
            activateAlert("warning", "You lost this round(");
          }
          const newRiddler = members.find(
            (m: IMember) => m.user.id !== activeRound?.riddler?.id
          );
          if (newRiddler) {
            const res = await createRound({
              riddlerId: newRiddler.user.id,
              chatId: activeGame.activeChat,
            });
            // @ts-ignore
            const newRound = res.data;
            if (newRound) {
              socket.emit("newRound", {
                previousWinner: winner,
                gameId: activeGame.activeChat,
                round: newRound,
                receivers,
              });
            }
          }
        }
      }
    }
    setMoveType("question");
    setMoveData("");
    setRoundData("");
  };

  const updateWord = async () => {
    if (roundData && activeRound) {
      await updateRoundData({ id: activeRound.id!, round_data: roundData });
      if (!error) {
        dispatch(addRoundData(roundData));
        const receivers = members.map((m: IMember) => m.user.id);
        socket.emit("updateWord", {
          player: userData,
          receivers,
          round_data: roundData,
          gameId: activeGame.activeChat,
          roundId: activeRound.id,
        });
      }
      setRoundData("");
    }
  };

  if (nativeRound.submiting < 2) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {userData && activeRound ? (
        activeRound?.riddler?.id === userData.id ? (
          activeRound.round_data ? (
            <div className={styles.buttons}>
              {!isLoading ? (
                <>
                  <Button
                    onClick={() => sendResponse("yes")}
                    className={styles.boolBtn}
                    variant="contained"
                    color="warning"
                    disabled={disableNotMyTurn(activeRound, userData)}
                  >
                    YES
                  </Button>
                  <Button
                    className={styles.boolBtn}
                    onClick={() => sendResponse("no")}
                    variant="outlined"
                    color="warning"
                    disabled={disableNotMyTurn(activeRound, userData)}
                  >
                    NO
                  </Button>
                </>
              ) : (
                <CircularProgress color="warning" />
              )}
            </div>
          ) : (
            <div className={styles.textfield}>
              <GameInput
                value={roundData}
                onChange={(e: any) => setRoundData(e.target.value)}
                name={"round data"}
                label={"Riddle a word"}
              />

              {!isLoading ? (
                <div onClick={() => updateWord()} className={styles.btnSection}>
                  <IconButton
                    disabled={disableNotMyTurn(activeRound, userData)}
                  >
                    <Image
                      src="/img/send.svg"
                      width="30"
                      height="30"
                      alt={"Send icon"}
                    />
                  </IconButton>
                </div>
              ) : (
                <CircularProgress color="warning" />
              )}
            </div>
          )
        ) : (
          <div className={styles.textfield}>
            <div className={styles.inputfield}>
              <GameInput
                value={moveData}
                onChange={(e: any) => setMoveData(e.target.value)}
                name={"move"}
                label={"Move data"}
              />
            </div>
            <div className={styles.selectItem}>
              <label id="input-type">Type of propose</label>
              <select
                id="input-type"
                value={moveType}
                onChange={(e) => {
                  setMoveType(e.target.value);
                }}
              >
                <option value={"question"}>Question</option>
                <option value={"statement"}>Statement</option>
              </select>
            </div>
            {!isLoading && !disableNotMyTurn(activeRound, userData) && (
              <div onClick={() => sendResponse()} className={styles.btnSection}>
                <IconButton>
                  <Image
                    src="/img/send.svg"
                    width="30"
                    height="30"
                    alt={"Send icon"}
                  />
                </IconButton>
              </div>
            )}
            {isLoading && <CircularProgress color="warning" />}
          </div>
        )
      ) : (
        <h1>unathorized</h1>
      )}
    </div>
  );
};

export default GameTextField;
