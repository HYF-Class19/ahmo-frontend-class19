import React, { useEffect, useRef, useState } from "react";
import { IMove } from "@/models/IGame";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData } from "@/store/slices/userSlice";
import {
  useGetRoundQuery,
  useUpdateRoundDataMutation,
} from "@/services/roundServive";
import RoundMove from "@/components/game/RoundMove";
import {
  addSubmitting,
  selectActiveRound,
  setRound,
} from "@/store/slices/roundSlice";
import { selectMembers } from "@/store/slices/chatSlice";

import styles from "./GameRound.module.scss";
import { Button } from "@mui/material";
import { socket } from "@/utils/socket";
import { getReceivers } from "@/utils/chatHelpers";
import clsx from "clsx";
import TruthDareRound from "../TruthDareRound";

interface GameRoundProps {
  roundId: number;
  index: number;
  gameType: string | null;
}
const GameRound: React.FC<GameRoundProps> = ({ roundId, index,  gameType}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userData = useAppSelector(selectUserData);
  const { data: round, error, isLoading } = useGetRoundQuery(roundId);
  const [updateRound, result] = useUpdateRoundDataMutation();
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);
  const activeRound = useAppSelector(selectActiveRound);
  const scrollRef = useRef<any>();

  useEffect(() => {
    if (round) {
      if (round.round_status === "active") {
        dispatch(setRound(round));
      }
    }
  }, [round]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [activeRound.moves]);

  const sendSubmit = async () => {
    await updateRound({ id: roundId, submiting: 1 });
    setIsSubmitted(true);
    if (userData) {
      const receivers = getReceivers(userData.id, members);
      socket.emit("submitRound", {
        receivers,
      });
      dispatch(addSubmitting);
    }
  };

  return (
    <div className={clsx(styles.wrapper, isSubmitted && styles.submitted)}>
      {isLoading && <div>is loading...</div>}
      {error && <div>Error</div>}
      {round && userData && (
      gameType === 'guess a word' ? (  
        activeRound.submiting === 2 || round.id !== activeRound.id ? (
          <>
            <div className={styles.riddler}>
              <p>
                <span>
                  {round.riddler.id === userData.id
                    ? "you are"
                    : round.riddler.fullName + " is"}
                </span>{" "}
                a riddler
              </p>
            </div>
            {round.moves.map((move) => (
              <div ref={scrollRef} key={move.id}>
                <RoundMove my={userData.id === move?.player?.id} move={move} />
              </div>
            ))}
            {activeRound.round_winner ||
              (round.id !== activeRound?.id && (
                <div className={styles.winner}>
                  <hr />
                  <p>
                    {" "}
                    winner:{" "}
                    {
                      members.find(
                        (m: any) =>
                          m.user.id === round.round_winner ||
                          m.user.id === activeRound.round_winner
                      )?.user.fullName
                    }
                  </p>
                </div>
              ))}
          </>
        ) : (
          <div className={styles.submitArea}>
            {isSubmitted ? (
              <h4>We are waiting for your opponent sumbition</h4>
            ) : (
              <Button
                onClick={sendSubmit}
                className={styles.boolBtn}
                variant="contained"
                color="warning"
                disabled={result.isLoading}
              >
                Start New Round
              </Button>
            )}
          </div>
        )
      ):(
        <TruthDareRound round={round} userData={userData} activeRound={activeRound} />
      ))}
    </div>
  );
};

export default GameRound;
