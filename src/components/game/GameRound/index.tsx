import React, {useEffect, useRef} from 'react';
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
    const scrollRef = useRef<any>();

    useEffect(() => {
        if(round) {
            if(round.round_status === 'active') {
                dispatch(setRound(round))
            }
        }
    }, [round])

    const isWaitingForOpponentRiddle = (round: IRound, userData: any) =>
        !round.round_data && userData.id !== round.riddler.id;

    const isWaitingForOpponentAnswer = (round: IRound, userData: any) =>
        round.round_data && userData.id === round.riddler.id;

    const isYourTurnToGuess = (round: IRound, userData: any) =>
        round.round_data && userData.id !== round.riddler.id;

        useEffect(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [activeRound.moves]);

    return (
        <div className={styles.wrapper}>
            {isLoading && <div>is loading...</div>}
            {error && <div>Error</div>}
            {round && userData && (
                <>
                    <p><span>{round.riddler.id === userData.id ? "you" : round.riddler.fullName}</span> is a riddler</p>
                    {round.id !== activeRound?.id ?
                        userData.id === round.riddler.id ?
                        round.round_data ? (
                        <div className={styles.riddle}>
                            <h4>You named a word: <span>{round.round_data}</span></h4>
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
                    {round.round_status === 'finished' ?
                        round.moves.map((move) => (
                         <RoundMove move={move} key={move.id} />
                        ))
                        :
                        activeRound?.moves?.map((move: IMove) => (
                            <div key={move.id} ref={scrollRef}><RoundMove move={move}  /></div>
                        ))
                    }
                    {activeRound.round_winner || round.id !== activeRound?.id && (
                        <p>winner: {members.find((m: any) => m.user.id === round.round_winner || m.user.id === activeRound.round_winner)?.user.fullName}</p>
                    )}
                </>
                )}
        </div>
    );
};

export default GameRound;
