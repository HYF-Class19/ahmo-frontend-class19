import React, {useEffect} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat, setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import styles from "./GameBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {IGame} from "@/models/IGame";
import GameHeader from "@/components/game/GameHeader";

const GameBox = () => {
    const selectedGame = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(game) {
            dispatch(setGameChat(game))
        }
    }, [game])


    return (
        <div className={styles.chatBoxWrapper}>
            {selectedGame.activeChat &&  userData ? (
                <>
                 <div className={styles.chatBoxTop}>
                     {isLoading && <div>Loading...</div>}
                        {error && <div>Error</div>}
                        {game && (
                            <>
                                <div className={styles.chatBoxTopTitle}>
                                    <GameHeader />
                                </div>
                                <div style={{overflowY: 'auto'}} className={styles.box}>
                                    {game.rounds.map((round, index) => (
                                        <GameRound key={round.id} roundId={round.id} index={index} />
                                    ))}
                                </div>
                            </>
                        )}
                 </div>
                    <GameTextField />
                </>
            ) : <h1>No chat available</h1>}
        </div>
    );
};

export default GameBox;
