import React, {useEffect, useState} from 'react';
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
import {ArrivingMessage} from "@/models/IMessage";

interface GameBoxProps {
    socket: any
}

const GameBox: React.FC<GameBoxProps> = ({socket}) => {
    const [arrivalMove, setArrivalMove] = useState<ArrivingMove>();
    const selectedGame = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     socket.current = io("ws://localhost:5000");
    //     socket.current.on("getMove", (data: ArrivingMove) => {
    //         setArrivalMove({
    //             id: data.id,
    //             player: data.player,
    //             round: data.round,
    //             move_data:  data.move_data,
    //             move_type: data.move_type,
    //             createdAt: data.createdAt,
    //         });
    //     });
    // }, []);

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
