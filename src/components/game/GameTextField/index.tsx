import React, { useState } from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {
  useCreateMoveMutation,
  useCreateRoundMutation,
  useUpdateRoundDataMutation,
} from "@/services/roundServive";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import {
  addScore,
  selectActiveChat,
  selectMembers,
} from "@/store/slices/chatSlice";
import {
  addRoundData,
  selectActiveRound,
  setRound,
} from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { IMember } from "@/models/IChat";
import { socket } from "@/utils/socket";
import { styled } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";

import styles from "./GameTextField.module.scss";
import { disableNotMyTurn } from "@/utils/round-helper";

interface GameTextFieldProps {
  chatId: number;
}

const GameTextField: React.FC<GameTextFieldProps> = ({ chatId }) => {
  const [moveData, setMoveData] = useState<string>();
  const [moveType, setMoveType] = useState<string>("question");
  const [roundData, setRoundData] = useState<string>();
  const [createMove, {isLoading}] = useCreateMoveMutation();
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
      console.log("yes");
      // @ts-ignore
      const move = result.data;
      if (move) {
        const receivers = activeGame.members
          .filter((m: IMember) => m.user.id !== userData?.id)
          .map((m: IMember) => m.user.id);
        socket.emit("sendMove", { ...move, chatId, receivers });
        if ((move.correct || activeRound.attempt >= 3) && activeRound?.riddler) {
         if(move.correct) {
             dispatch(addScore({ winner: move.player.id }));
         } else {
            dispatch(addScore({ winner: activeRound.riddler.id })); 
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
              socket.emit("newRound", { round: newRound, receivers });
              dispatch(setRound(newRound));
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
        const receivers = members
        .filter((m: IMember) => m.user.id !== userData?.id)
        .map((m: IMember) => m.user.id);
        socket.emit('updateWord', {player: userData, receivers, round_data: roundData})
      }
      setRoundData("");
    }
  };

  return (
    <div className={styles.wrapper}>
        {userData && activeRound ? 
        activeRound?.riddler?.id === userData.id ? (
            activeRound.round_data ? (
              <div className={styles.buttons}>
                <Button
                  onClick={() => sendResponse("yes")}
                  className={styles.boolBtn}
                  variant="contained"
                  color="warning"
                  disabled={isLoading|| disableNotMyTurn(activeRound, userData)}
                >
                  YES
                </Button>
                <Button
                  className={styles.boolBtn}
                  onClick={() => sendResponse("no")}
                  variant="outlined"
                  color="warning"
                  disabled={isLoading|| disableNotMyTurn(activeRound, userData)}
                >
                  NO
                </Button>
              </div>
            ) : (
              <div className={styles.textfield}>
                <div className={styles.inputfield}>
              <label htmlFor="round_data">Riddle a word</label>
              <input
                value={roundData}
                onChange={(e) => setRoundData(e.target.value)}
                id="round_data"
                placeholder={"place your riddle here"}
              />
            </div>
                <div className={styles.btnSection}>
                  <Button
                    onClick={updateWord}
                    variant={"outlined"}
                    color={"warning"}
                    disabled={isLoading|| disableNotMyTurn(activeRound, userData)}
                  >
                    Send
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className={styles.textfield}>
            <div className={styles.inputfield}>
              <label htmlFor="move_data">Move data</label>
              <input
                value={moveData}
                onChange={(e) => setMoveData(e.target.value)}
                id="move_data"
                placeholder={"place your move data here"}
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
                  defaultValue={"question"}
                >
                  <option value={"question"}>Question</option>
                  <option value={"statement"}>Statement</option>
                </select>
              </div>
              <div className={styles.btnSection}>
                <Button
                  onClick={() => sendResponse()}
                  variant={"contained"}
                  disabled={isLoading || disableNotMyTurn(activeRound, userData)}
                  color={"warning"}
                >
                  Send
                </Button>
              </div>
            </div>
          )
          : (
            <h1>unathorized</h1>
          )
    }
    </div>
  );
};

export default GameTextField;
