import React, {useEffect, useRef} from 'react';
import {IMove} from "@/models/IGame";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useGetRoundQuery} from "@/services/roundServive";
import RoundMove from "@/components/game/RoundMove";
import {selectActiveRound, setRound} from "@/store/slices/roundSlice";
import {selectMembers} from "@/store/slices/chatSlice";

import styles from './GameRound.module.scss'

interface GameRoundProps {
    roundId: number;
    index: number
}
const GameRound: React.FC<GameRoundProps> = ({roundId, index}) => {
    const userData = useAppSelector(selectUserData)
    const {data: round, error, isLoading} = useGetRoundQuery(roundId)
    const dispatch = useAppDispatch()
    const members = useAppSelector(selectMembers)
    const activeRound = useAppSelector(selectActiveRound)
    const scrollRef = useRef<any>();

    useEffect(() => {
        if(round) {
            if(round.round_status === 'active') {
                dispatch(setRound(round))
            }
        }
    }, [round])

        useEffect(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [activeRound.moves]);

    return (
        <div className={styles.wrapper}>
            {isLoading && <div>is loading...</div>}
            {error && <div>Error</div>}
            {round && userData && (
                <>
                    <div className={styles.riddler}>
                        <p><span>{round.riddler.id === userData.id ? "you are" : round.riddler.fullName + ' is'}</span> a riddler</p>
                    </div>
                    {round.moves.map((move) => (
                        <RoundMove my={userData.id === move?.player?.id} move={move} key={move.id} />
                    ))}
                    {activeRound.round_winner || round.id !== activeRound?.id && (
                        <div className={styles.winner}>
                            <hr />
                            <p> winner: {members.find((m: any) => m.user.id === round.round_winner || m.user.id === activeRound.round_winner)?.user.fullName}</p>
                        </div>
                    )}
                </>
                )}
        </div>
    );
};

export default GameRound;
