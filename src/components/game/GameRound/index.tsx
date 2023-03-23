import React, {useEffect} from 'react';
import {IMove, IRound} from "@/models/IGame";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useCreateRoundMutation, useGetRoundQuery} from "@/services/roundServive";


import styles from './GameRound.module.scss'
import RoundMove from "@/components/game/RoundMove";
import {selectActiveRound, setRound} from "@/store/slices/roundSlice";
import {selectMembers} from "@/store/slices/chatSlice";

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

    useEffect(() => {
        if(round) {
            if(round.round_status === 'active') {
                dispatch(setRound(round))
            }
        }
    }, [round])


    return (
        <div className={styles.wrapper}>
            {isLoading && <div>is loading...</div>}
            {error && <div>Error</div>}
            {round && userData && (
                <>
                    <p>{round.riddler.fullName} should start the round</p>
                    {round.id !== activeRound?.id ?
                        userData.id === round.riddler.id ?
                        round.round_data ? (
                        <div>
                            <h4>You named a word: {round.round_data}</h4>
                        </div>
                    ) : (
                        <div>
                            <p>Opponent is waiting for your riddle</p>
                        </div>
                    ) : (
                            !round.round_data ? (
                                <div>
                                    <p>We are waiting for your opponent's answer</p>
                                </div>
                                ) : (
                                    <div>
                                        <p>Your turn to guess a word</p>
                                    </div>
                            )
                        ) : (
                            userData.id === round.riddler.id ?
                                activeRound.round_data ? (
                                    <div>
                                        <h4>You named a word: {activeRound.round_data}</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Opponent is waiting for your riddle</p>
                                    </div>
                                ) : (
                                    !activeRound.round_data ? (
                                        <div>
                                            <p>We are waiting for your opponent's answer</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Your turn to guess a word</p>
                                        </div>
                                    )
                                )
                        )}
                    { activeRound.round_winner || round.id !== activeRound?.id && (
                        <p>winner: {members.find((m: any) => m.user.id === round.round_winner || m.user.id === activeRound.round_winner)?.user.fullName}</p>
                    )}
                    {round.id !== activeRound?.id ?
                        round.moves.map((move) => (
                         <RoundMove move={move} key={move.id} />
                        ))
                        :
                        activeRound.moves.map((move: IMove) => (
                            <RoundMove move={move} key={move.id} />
                        ))
                    }
                </>
                )}
        </div>
    );
};

export default GameRound;
