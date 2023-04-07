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
import {addRoundData, selectActiveRound, setRound } from '@/store/slices/roundSlice';
import { socket } from '@/utils/socket';
import { api } from '@/services/api';
import RoundData from '../RoundData';
import { IUser } from '@/models/IUser';
import TruthDareField from '../TruthDareField';
import WordsTextField from '../WordsTextField';
import SelectChatTemplate from '@/components/shared/SelectChatTemplate';
import GameAlert from '@/components/shared/GameAlert';
import { getStatusForCurrentUser } from '@/utils/round-helper';
import clsx from 'clsx';
import { AlertColor } from '@mui/material';

interface GameBoxProps {
    
}

const GameBox: React.FC<GameBoxProps> = () => {
    const [open, setOpen] = useState(true)
    const [severity, setSeverity] = useState<AlertColor>('info')
    const [alertContent, setAlertContent] = useState('')
    const selectedGame = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data: game, isLoading, error} = useGetGameQuery(selectedGame.activeChat || 0)
    const activeRound = useAppSelector(selectActiveRound);
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
        setSeverity('info')
        setOpen(true)
        if(activeRound?.id && userData && game?.game){
            setAlertContent(getStatusForCurrentUser(activeRound, userData, game.game))
        }
    }, [selectedGame.activeChat])


    useEffect(() => {
        if(game) {
            dispatch(setGameChat(game))
        }
    }, [game])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [selectedGame.rounds]) 

    const activateAlert = (severity: AlertColor, content: string) => {
        setSeverity(severity)
        setAlertContent(content)
        setOpen(true)
    }

    return (
        <div className={styles.chatBoxWrapper}>
            {game?.game && userData && selectedGame?.members.length > 1 ? (
                <>
                <div className={clsx(styles.alertWrapper, open && styles.alertOpen)}>
                <div className={styles.alert}>
                    <GameAlert open={open} setOpen={setOpen} severity={severity}>
                      {alertContent}
                    </GameAlert>
                 </div>
                </div>
                <GameHeader />
                {game.game !== 'words' && <RoundData gameType={game.game} count={game.rounds.length}/>}
                <div ref={boxRef} style={{overflowY: 'auto'}} className={styles.box}>
                    {game.rounds.map((round: IRound, index: number) => (
                        <div key={round.id} ref={scrollRef}>
                            <GameRound activateAlert={activateAlert} gameType={game.game} roundId={round.id} />
                        </div>
                    ))}
                </div>
                 {game.game === 'truth or dare' && <TruthDareField activateAlert={activateAlert} chatId={selectedGame.activeChat} /> }
                    {game.game === 'guess a word' &&  <GameTextField activateAlert={activateAlert} chatId={selectedGame.activeChat} />}
                    {game.game === 'words' &&  <WordsTextField activateAlert={activateAlert} chatId={selectedGame.activeChat} />}
                </>
            ) : <SelectChatTemplate typeOfChat={'game'} />}
        </div>
    );
};

export default GameBox;

