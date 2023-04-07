import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IMember } from "@/models/IChat";
import {
  useCreateMoveMutation,
  useCreateRoundMutation,
  useUpdateRoundDataMutation,
} from "@/services/roundServive";
import {
  selectMembers,
  selectActiveChat,
  addScore,
} from "@/store/slices/chatSlice";
import {
  addRoundData,
  selectActiveRound,
  setRound,
} from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { disableNotMyTurn } from "@/utils/round-helper";
import { socket } from "@/utils/socket";
import React, { useEffect, useState } from "react";

import styles from '../GameTextField/GameTextField.module.scss'
import { Button, IconButton } from "@mui/material";
import GameActions from "../GameActions";
import GameInput from "../GameInput";
import SendIcon from "@/components/shared/SendIcon";
import Image from 'next/image'

interface TruthDareFieldProps {
  chatId: number;
  activateAlert: Function
}
const TruthDareField: React.FC<TruthDareFieldProps> = ({ chatId, activateAlert }) => {
  const [moveData, setMoveData] = useState<string>('');
  const [moveType, setMoveType] = useState<string>("answer");
  const [roundData, setRoundData] = useState<string>("truth");
  const [createMove, { isLoading }] = useCreateMoveMutation();
  const userData = useAppSelector(selectUserData);
  const members = useAppSelector(selectMembers);
  const activeGame = useAppSelector(selectActiveChat);
  const activeRound = useAppSelector(selectActiveRound);
  const [createRound] = useCreateRoundMutation();
  const [updateRoundData, { error, isLoading: isRoundDataLoading }] =
    useUpdateRoundDataMutation();
  const dispatch = useAppDispatch();

  const sendResponse = async (answer?: string) => {
    if (!activeRound.round_data) {
      await updateWord();
    }

    if ((answer || moveData) && (moveType || answer) && activeRound) {
      const result = await createMove({
        move_data: moveData || answer,
        move_type: answer ? "statement" : moveType,
        roundId: activeRound.id,
      });
      // @ts-ignore
      const move = result.data;
      if (move) {
        const receivers = activeGame.members
          .filter((m: IMember) => m.user.id !== userData?.id)
          .map((m: IMember) => m.user.id);
        socket.emit("sendMove", { ...move, chatId, receivers });
        if (answer && activeRound?.riddler) {
          if (move.correct) {
            dispatch(addScore({ winner: move.player.id }));
            activateAlert('success', 'You won this round')
          } else {
            dispatch(addScore({ winner: activeRound.riddler.id }));
            activateAlert('warning', 'You lost this round')
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
    setMoveType('answer');
    setMoveData("");
    setRoundData("truth");
  };

  const updateWord = async () => {
    if (roundData && activeRound) {
      await updateRoundData({ id: activeRound.id!, round_data: roundData });
      if (!error) {
        dispatch(addRoundData(roundData));
        const receivers = members
          .filter((m: IMember) => m.user.id !== userData?.id)
          .map((m: IMember) => m.user.id);
        socket.emit("updateWord", {
          player: userData,
          receivers,
          round_data: roundData,
          roundId: activeRound.id
        });
      }
      setRoundData("");
    }
  };

  return (
    <div className={styles.wrapper}>
        {userData && activeRound 
        ?  activeRound?.riddler?.id === userData.id ? (
            !activeRound.round_data && (
                <div className={styles.textfield}>
                    <div className={styles.inputfield}><GameInput
                      value={moveData}
                      onChange={(e: any) => setMoveData(e.target.value)}
                      id="move_data"
                      placeholder={"place your move data here"}
                    /></div>
                  <div className={styles.selectItem}>
                    <label id="input-type">Type of propose</label>
                    <select
                      id="input-type"
                      value={roundData}
                      onChange={(e) => {
                        setRoundData(e.target.value);
                      }}
                    >
                      <option value={"truth"}>Truth</option>
                      <option value={"dare"}>Dare</option>
                    </select>
                  </div>
                  <div onClick={() => sendResponse()} className={styles.btnSection}>
                  {!isLoading && !isLoading || disableNotMyTurn(activeRound, userData) &&<IconButton
                  >
                  <Image src='/img/send.svg' width="30" height='30' alt={'Send icon'} />
                </IconButton>}
                </div>
                </div>
              )
        ) 
        : (
            activeRound.round_data && (
                <GameActions
                      isDisabled={
                        isRoundDataLoading || disableNotMyTurn(activeRound, userData)
                      }
                      sendResponse={sendResponse}
                      values={["truth", "dare"]}
                    />
        ))
        : (
            <h1>unathorized</h1>
          )}
    </div>
    );
};

export default TruthDareField;
