import React, {useEffect} from 'react';
import {IRound} from "@/models/IGame";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useCreateRoundMutation, useGetRoundQuery} from "@/services/roundServive";


import styles from './GameRound.module.scss'
import RoundMove from "@/components/game/RoundMove";
import {selectActiveChat, selectActiveRound, selectMembers, setGameChat} from "@/store/slices/chatSlice";
import {IMember} from "@/models/IChat";

interface GameRoundProps {
    roundId: number;
    index: number
}
const GameRound: React.FC<GameRoundProps> = ({roundId, index}) => {
    const userData = useAppSelector(selectUserData)
    const {data: round, error, isLoading} = useGetRoundQuery(roundId)
    const activeRound = useAppSelector(selectActiveRound)
    const [createRound, {data}] = useCreateRoundMutation()
    const dispatch = useAppDispatch()


    return (
        <div className={styles.wrapper}>
            {isLoading && <div>is loading...</div>}
            {error && <div>Error</div>}
            {round && userData && (
                <>
                    <p>{round.riddler.fullName} should start the round</p>
                    {userData.id === round.riddler.id ?
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
                        )}
                    {round.moves.map((move) => (
                        <RoundMove move={move} key={move.id} />
                    ))}
                </>
                )}
        </div>
    );
};

export default GameRound;
