import React, {useEffect, useRef, useState} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {addRound, addScore, selectActiveChat, selectMembers, setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import styles from "./GameBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {ArrivingMove, IGame, IRound} from "@/models/IGame";
import GameHeader from "@/components/game/GameHeader";
import { addMove, selectActiveRound, setRound, updateRoundStatus } from '@/store/slices/roundSlice';
import { IMember } from '@/models/IChat';
import { useCreateRoundMutation } from '@/services/roundServive';
import axios from 'axios';
import { socket } from '@/utils/socket';

interface GameBoxProps {
}

const GameBox: React.FC<GameBoxProps> = () => {
    const [arrivalMove, setArrivalMove] = useState<ArrivingMove>();
    const selectedGame = useAppSelector(selectActiveChat)
    const activeRound = useAppSelector(selectActiveRound)
    const userData = useAppSelector(selectUserData)
    const members = useAppSelector(selectMembers)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const dispatch = useAppDispatch()

    useEffect(() => {
            socket.on("getMove", (data: ArrivingMove) => {
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

            return () => {
                socket.off("getMove")
            }
    }, []);


    useEffect(() => {
        
        if(game) {
            let rounds = []
            for(let i = game.rounds.length - 1; i > 0; i--){
                rounds.push(game.rounds[i])
            }
            console.log(rounds)
            dispatch(setGameChat(game))
        }
    }, [game])

    useEffect(() => {

        const createIfCorrect = async () => {
            if(arrivalMove && arrivalMove.move_type === 'statement' && arrivalMove.correct) {
                dispatch(updateRoundStatus({round_status: 'finished', winner: arrivalMove.player.id}))
                dispatch(addScore({winner: arrivalMove.player.id}))
                dispatch(addRound(activeRound))
                const newRiddler = members.find((m: IMember) => m.user.id !== activeRound?.riddler?.id)
                if(newRiddler) {
                    console.log(newRiddler)
                    const {data} = await axios.get<IRound>(`http://localhost:4000/rounds/${selectedGame.activeChat}?q=active`)
                
                    if(data) {
                        dispatch(setRound(data))
                    }
                }
            }
        }
        if(arrivalMove?.player && selectedGame) {
            if(arrivalMove.chatId === selectedGame.activeChat && arrivalMove.player.id !== userData?.id) {
                dispatch(addMove(arrivalMove))
                if(arrivalMove.move_type === 'statement' && arrivalMove.correct) {
                    dispatch(addScore({winner: arrivalMove.player.id}))
                    createIfCorrect()
                }
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
                                    {selectedGame.rounds.map((round: IRound, index: number) => (
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

