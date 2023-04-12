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
    const scrollRef = useRef<any>()

    useEffect(() => {
        socket.on('getNewRound', (round: IRound) => {
            dispatch(api.util.invalidateTags(['Game', 'Round']))
            dispatch(setRound(round))
        })

        return () => {
            socket.off('getNewRound')
        }
    }, [])

    const getAlertContent = (content: string) => {
        if(!alertContent){
            setAlertContent(content)
        }
    }

    useEffect(() => {
        setSeverity('info')
        setOpen(true)
    }, [selectedGame.activeChat])


    useEffect(() => {
        if(game) {
            dispatch(setGameChat(game))
        }
    }, [game])

    useEffect(() => {
        if (game?.rounds) {
            const roundIdx = game.rounds.findIndex(round => round.round_status === 'active')
          if (roundIdx + 1) {
            dispatch(setRound(game.rounds[roundIdx]));
          }
        }
      }, [selectedGame.activeChat, game]);

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
                {alertContent && (
                     <div className={clsx(styles.alertWrapper, open && styles.alertOpen)}>
                     <div className={styles.alert}>
                         <GameAlert setAlertContent={setAlertContent} open={open} setOpen={setOpen} severity={severity}>
                           {alertContent}
                         </GameAlert>
                      </div>
                     </div>
                )}
                <GameHeader />
                {game.game !== 'words' && <RoundData getAlertContent={getAlertContent} gameType={game.game} count={game.rounds.length}/>}
                <div ref={boxRef} style={{overflowY: 'auto', overflowX: 'hidden'}} className={styles.box}>
                    {game.rounds && game.rounds.map((round: IRound) => (
                        <div key={round.id}>
                            <GameRound scrollRef={scrollRef} activateAlert={activateAlert} gameType={game.game} round={round} />
                        </div>
                    ))}
                </div>
                 {game.game === 'truth or dare' && <TruthDareField activateAlert={activateAlert} chatId={selectedGame.activeChat} /> }
                    {game.game === 'guess a word' &&  <GameTextField nativeRound={game.rounds.find(r => r.round_status === 'active')!} activateAlert={activateAlert} chatId={selectedGame.activeChat} />}
                    {game.game === 'words' &&  <WordsTextField nativeRound={game?.rounds.find(r => r.round_status === 'active')!} activateAlert={activateAlert} chatId={selectedGame.activeChat} />}
                </>
            ) : <SelectChatTemplate typeOfChat={'game'} />}
        </div>
    );
};

export default GameBox;

