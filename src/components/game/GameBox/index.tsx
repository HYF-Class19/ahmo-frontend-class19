import React, {useEffect} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat,setGameChat} from "@/store/slices/chatSlice";
import styles from "./GameBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {IRound} from "@/models/IGame";
import GameHeader from "@/components/game/GameHeader";
import {setRound } from '@/store/slices/roundSlice';
import { socket } from '@/utils/socket';
import { api } from '@/services/api';

interface GameBoxProps {
}

const GameBox: React.FC<GameBoxProps> = () => {
    const selectedGame = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)

    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('getNewRound', (round: IRound) => {
            dispatch(api.util.invalidateTags(['Game', 'Round']))
            dispatch(setRound(round))
        })

        return () => {
            socket.off('getNewRound')
        }
    }, [])


    useEffect(() => {
        if(game) {
            dispatch(setGameChat(game))
        }
    }, [game])


    return (
        <div className={styles.chatBoxWrapper}>
            {game?.id &&  userData ? (
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
                                    {game.rounds.map((round: IRound, index: number) => (
                                        <GameRound key={round.id} roundId={round.id} index={index} />
                                    ))}
                                </div>
                            </>
                        )}
                 </div>
                    <GameTextField chatId={selectedGame.activeChat} /> 
                </>
            ) : <h1>No chat available</h1>}
        </div>
    );
};

export default GameBox;

