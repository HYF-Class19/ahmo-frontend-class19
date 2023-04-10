import { useAppSelector } from "@/hooks/useAppHooks";
import { selectMembers } from "@/store/slices/chatSlice";
import { selectActiveRound } from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { getGuesser, getStatusForCurrentUser } from "@/utils/round-helper";
import React, { useEffect } from "react";
import styles from "./RoundData.module.scss";

interface RoundDataProps {
  count: number;
  gameType: string
}

const RoundData: React.FC<RoundDataProps> = ({ count, gameType }) => {
  const userData = useAppSelector(selectUserData);
  const activeRound = useAppSelector(selectActiveRound);
  const members = useAppSelector(selectMembers)

  return (
    <div className={styles.wrapper}>
      {!activeRound ? (
        <p>You finished this game</p>
      ) : (
        <>
          <div className={styles.item}>
            <h3>Round {count}</h3>
            { userData?.id === activeRound.riddler?.id && activeRound.round_data && (
                gameType === 'guess a word' ? <p>You riddled a word: {activeRound.round_data}</p> : <p>your statement is {activeRound.round_data}</p> 
            )} 
            <p>{activeRound.id && userData && getStatusForCurrentUser(activeRound, userData, gameType)}</p>
          </div>
          <div className={styles.item}>
            <div className={styles.roles}>
              <p>
                Riddler: <b>{activeRound.riddler?.id === userData?.id ? 'YOU' : activeRound.riddler?.fullName }</b>
              </p>
              <p>
                Guesser: <b>{activeRound.riddler && userData && getGuesser(members, userData, activeRound.riddler)}</b>
              </p>
            </div>
            {gameType === 'guess a word' &&
            <p>
            Statements left: <b>{3 - activeRound.attempt}</b>
          </p>
          }
          </div>
        </>
      )}
    </div>
  );
};

export default RoundData;
