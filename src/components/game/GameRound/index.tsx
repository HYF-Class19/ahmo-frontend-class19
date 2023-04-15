import RoundMove from "@/components/game/RoundMove";
import { useAppSelector } from "@/hooks/useAppHooks";
import { IRound } from "@/models/IGame";
import { useUpdateRoundDataMutation } from "@/services/roundServive";
import { selectMembers } from "@/store/slices/chatSlice";
import { selectActiveRound } from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import React, { useState } from "react";

import { IMember } from "@/models/IChat";
import { socket } from "@/utils/socket";
import { Button } from "@mui/material";
import clsx from "clsx";
import TruthDareRound from "../TruthDareRound";
import styles from "./GameRound.module.scss";

interface GameRoundProps {
  round: IRound;
  gameType: string | null;
  activateAlert: Function;
  scrollRef: any;
}
const GameRound: React.FC<GameRoundProps> = ({
  round,
  gameType,
  activateAlert,
  scrollRef,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userData = useAppSelector(selectUserData);
  const [updateRound, result] = useUpdateRoundDataMutation();
  const members = useAppSelector(selectMembers);
  const activeRound = useAppSelector(selectActiveRound);

  const sendSubmit = async () => {
    await updateRound({ id: round.id, submiting: 1 });
    setIsSubmitted(true);
    if (userData) {
      const receivers = members.map((m: IMember) => m.user.id);
      socket.emit("submitRound", {
        receivers,
      });
    }
  };

  return (
    <div className={clsx(styles.wrapper, isSubmitted && styles.submitted)}>
      {round &&
        userData &&
        (gameType === "guess a word" ? (
          activeRound.submiting >= 2 || round.id !== activeRound.id ? (
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
                  <RoundMove
                    my={userData.id === move?.player?.id}
                    move={move}
                  />
                </div>
              ))}
              {round.round_winner && (
                <div className={styles.winner}>
                  <hr />
                  <p>
                    {" "}
                    winner:{" "}
                    {
                      members.find((m: any) => m.user.id === round.round_winner)
                        ?.user.fullName
                    }
                  </p>
                </div>
              )}
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
        ) : gameType === "truth or dare" ? (
          <TruthDareRound
            round={round}
            userData={userData}
            activeRound={activeRound}
          />
        ) : (
          round.moves.map((move) => (
            <div ref={scrollRef} key={move.id}>
              <RoundMove my={userData.id === move?.player?.id} move={move} />
            </div>
          ))
        ))}
    </div>
  );
};

export default GameRound;
