import { useAppSelector } from "@/hooks/useAppHooks";
import { IRound } from "@/models/IGame";
import { IUser } from "@/models/IUser";
import { selectMembers } from "@/store/slices/chatSlice";
import { getRoundWinnerMessage } from "@/utils/round-helper";
import React from "react";
import styles from "../GameRound/GameRound.module.scss";
import RoundMove from "../RoundMove";

interface TruthDareRoundProps {
  round: IRound;
  userData: IUser;
  activeRound: any;
  scrollRef: any;
}

const TruthDareRound: React.FC<TruthDareRoundProps> = ({
  round,
  userData,
  activeRound,
  scrollRef,
}) => {
  const members = useAppSelector(selectMembers);
  return (
    <>
      {round.moves.map((move) => (
        <div ref={scrollRef} key={move.id}>
          <RoundMove my={userData.id === move?.player?.id} move={move} />
        </div>
      ))}
      {activeRound.round_winner ||
        (round.id !== activeRound?.id && (
          <div className={styles.winner}>
            <hr />
            <p>{getRoundWinnerMessage(round, members, "truth or dare")}</p>
          </div>
        ))}
    </>
  );
};

export default TruthDareRound;
