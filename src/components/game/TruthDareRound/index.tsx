import { useAppSelector } from '@/hooks/useAppHooks';
import { IRound } from '@/models/IGame';
import { IUser } from '@/models/IUser';
import styles from "../GameRound/GameRound.module.scss";
import React from 'react'
import RoundMove from '../RoundMove';
import { selectMembers } from '@/store/slices/chatSlice';

interface TruthDareRoundProps {
    round: IRound
    userData: IUser
    activeRound: any
}

const TruthDareRound: React.FC<TruthDareRoundProps> = ({round, userData, activeRound}) => {
const members = useAppSelector(selectMembers);
  return (
    <>
        {round.moves.map((move) => (
              <div key={move.id}>
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
  )
}

export default TruthDareRound