import React, {useEffect, useRef, useState} from 'react';
import {useGetGameQuery} from "@/services/gameService";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat,setGameChat} from "@/store/slices/chatSlice";
import styles from "./GameBox.module.scss";
import {selectUserData} from "@/store/slices/userSlice";
import GameRound from "@/components/game/GameRound";
import GameTextField from "@/components/game/GameTextField";
import {IRound} from "@/models/IGame";
import GameHeader from "@/components/game/GameHeader";
import {addRoundData, setRound } from '@/store/slices/roundSlice';
import { socket } from '@/utils/socket';
import { api } from '@/services/api';
import RoundData from '../RoundData';
import { IUser } from '@/models/IUser';
import TruthDareField from '../TruthDareField';

interface GameBoxProps {
}

const GameBox: React.FC<GameBoxProps> = () => {
    const selectedGame = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const dispatch = useAppDispatch()
    const boxRef = useRef<any>()
    const scrollRef = useRef<any>();

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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [selectedGame.rounds]) 


    return (
        <div className={styles.chatBoxWrapper}>
            {game?.game && userData && selectedGame?.members.length > 1 ? (
                <>
                 <GameHeader />
                <RoundData gameType={game.game} count={game.rounds.length}/>
                <div ref={boxRef} style={{overflowY: 'auto'}} className={styles.box}>
                    {game.rounds.map((round: IRound, index: number) => (
                        <div key={round.id} ref={scrollRef}>
                            <GameRound gameType={game.game} roundId={round.id} index={index} />
                        </div>
                    ))}
                </div>
                 {game.game === 'truth or dare' ? <TruthDareField chatId={selectedGame.activeChat} /> : <GameTextField chatId={selectedGame.activeChat} /> }
                </>
            ) : <h1>No chat available</h1>}
        </div>
    );
};

export default GameBox;

