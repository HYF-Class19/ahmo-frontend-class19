import React, {useEffect, useRef, useState} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat, setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import styles from "./GameBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {ArrivingMove, IGame} from "@/models/IGame";
import GameHeader from "@/components/game/GameHeader";
import {io} from "socket.io-client";
import { addMove, selectActiveRound } from '@/store/slices/roundSlice';

interface GameBoxProps {
    socket: any
}

const GameBox: React.FC<GameBoxProps> = ({socket}) => {
    const [arrivalMove, setArrivalMove] = useState<ArrivingMove>();
    const selectedGame = useAppSelector(selectActiveChat)
    const activeRound = useAppSelector(selectActiveRound)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const dispatch = useAppDispatch()

    useEffect(() => {
            socket.current.on("getMove", (data: ArrivingMove) => {
                setArrivalMove({
                    id: data.id,
                    player: data.player,
                    chatId: data.chatId,
                    correct: data.correct,
                    move_data:  data.move_data,
                    move_type: data.move_type,
                    round: data.round,
                    createdAt: data.createdAt,
                });
            });
            console.log('socket', socket.current)
    }, []);

    useEffect(() => {
        if(game) {
            dispatch(setGameChat(game))
        }
    }, [game])

    useEffect(() => {
        console.log('arrivalMove', arrivalMove)
        if(arrivalMove?.player && selectedGame) {
            if(arrivalMove.chatId === selectedGame.activeChat && arrivalMove.player.id !== userData?.id) {
                dispatch(addMove(arrivalMove))
            }
        }
    }, [arrivalMove, selectedGame.activeChat])


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
                   {socket && <GameTextField socket={socket} chatId={selectedGame.activeChat} /> }
                </>
            ) : <h1>No chat available</h1>}
        </div>
    );
};

export default GameBox;
