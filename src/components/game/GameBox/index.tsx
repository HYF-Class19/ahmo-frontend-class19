import React, {useEffect} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat, setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import styles from "@/components/chat/ChatBox/ChatBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {IGame} from "@/models/IGame";

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

    useEffect(() => {
        console.log(selectedGame)
    }, [selectedGame]);


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
                                    {game.name}
                                </div>
                                <div className={styles.box}>
                                    {game.rounds.map((round, index) => (
                                        <GameRound key={round.id} roundId={round.id} index={index} />
                                    ))}
                                </div>
                            </>

                        )}
                     <GameTextField />
                 </div>
                </>
            ) : <h1>No chat available</h1>}
        </div>
    );
};

export default GameBox;
