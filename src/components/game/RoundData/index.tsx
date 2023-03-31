import { useAppSelector } from "@/hooks/useAppHooks";
import { selectMembers } from "@/store/slices/chatSlice";
import { selectActiveRound } from "@/store/slices/roundSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { getGuesser, getStatusForCurrentUser } from "@/utils/round-helper";
import React, { useEffect } from "react";
import styles from "./RoundData.module.scss";

interface RoundDataProps {
  count: number;
}

const RoundData: React.FC<RoundDataProps> = ({ count }) => {
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
            {userData?.id === activeRound.riddler?.id && activeRound.round_data && (
                <p>You riddled a word: {activeRound.round_data}</p> 
            )} 
            <p>{activeRound.id && userData && getStatusForCurrentUser(activeRound, userData)}</p>
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
            <p>
              Statements left: <b>2</b>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RoundData;
