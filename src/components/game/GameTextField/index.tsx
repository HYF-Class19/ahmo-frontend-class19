import React, {useState} from 'react';
import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useCreateMoveMutation, useCreateRoundMutation, useUpdateRoundDataMutation} from "@/services/roundServive";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {addScore, selectActiveChat, selectMembers} from "@/store/slices/chatSlice";
import {addRoundData, selectActiveRound, setRound} from '@/store/slices/roundSlice'
import {selectUserData} from "@/store/slices/userSlice";
import {IMember} from "@/models/IChat";
import { socket } from '@/utils/socket';

import styles from './GameTextField.module.scss'

interface GameTextFieldProps {
    chatId: number;
}

const GameTextField: React.FC<GameTextFieldProps> = ({chatId}) => {
    const [moveData, setMoveData] = useState<string>()
    const [moveType, setMoveType] = useState<string>('question')
    const [roundData, setRoundData] = useState<string>()
    const [createMove] = useCreateMoveMutation()
    const userData = useAppSelector(selectUserData)
    const members = useAppSelector(selectMembers)
    const activeGame = useAppSelector(selectActiveChat)
    const activeRound = useAppSelector(selectActiveRound)
    const [createRound,] = useCreateRoundMutation()
    const [updateRoundData, {error}] = useUpdateRoundDataMutation()
    const dispatch = useAppDispatch()

    const sendResponse = async (answer?: string) => {
        if ((answer || moveData) && (moveType || answer) && activeRound) {
            const result = await createMove({move_data: moveData || answer, move_type: moveType || 'answer', roundId: activeRound.id})
            console.log("yes")
            // @ts-ignore
            const move = result.data
            if(move) {
                const receivers = activeGame.members.filter((m: IMember) => m.user.id !== userData?.id).map((m: IMember) => m.user.id)
                socket.emit("sendMove", {...move, chatId, receivers})
                if(move.correct) {
                    dispatch(addScore({winner: move.player.id}))
                    const newRiddler = members.find((m: IMember) => m.user.id !== activeRound?.riddler?.id)
                    if(newRiddler) {
                        const res = await createRound({riddlerId: newRiddler.user.id, chatId: activeGame.activeChat})
                        // @ts-ignore
                        const newRound = res.data
                        if(newRound) {
                            socket.emit("newRound", {round: newRound, receivers})
                            dispatch(setRound(newRound))
                        }
                    }
                }
            }
        }
        setMoveType('question')
        setMoveData('')
        setRoundData('')
    }

    const updateWord = async () => {
        if(roundData && activeRound) {
            await updateRoundData({id: activeRound.id!, round_data: roundData})
            if (!error) {
                dispatch(addRoundData(roundData))
            }
            setRoundData('')
        }
    }

    return (
        <div className={styles.wrapper}>
            {userData && activeRound &&
                activeRound?.riddler?.id === userData.id ? (
                    activeRound.round_data ?
                <div className={styles.buttons}>
                    <Button onClick={() => sendResponse('yes')}>Yes</Button>
                    <Button onClick={() => sendResponse('no')}>No</Button>
                </div>
                        : (
                            <>
                                <TextField
                                    id="round_data"
                                    label="Riddle"
                                    placeholder={'place your riddle here'}
                                    value={roundData}
                                    onChange={(e) => setRoundData(e.target.value)}
                                    variant="standard"
                                />
                                <div className={styles.btnSection}>
                                    <Button onClick={updateWord} variant={'outlined'} color={'info'}>Send</Button>
                                </div>
                            </>
                        )
            ) : (
                <div className={styles.textfield}>
                    <TextField
                        label="Move data"
                        placeholder={'place your move data here'}
                        value={moveData}
                        onChange={(e) => setMoveData(e.target.value)}
                        variant="standard"
                    />
                    <div>
                        <InputLabel id="input-type">Type of propose</InputLabel>
                        <Select
                            id="input-type"
                            onChange={(e) => {
                                setMoveType(e.target.value)}
                            }
                            label="input type"
                            defaultValue={'question'}
                        >
                            <MenuItem value={'question'}>Question</MenuItem>
                            <MenuItem value={'statement'}>Statement</MenuItem>
                        </Select>
                    </div>
                    <div className={styles.btnSection}>
                        <Button onClick={() => sendResponse()} variant={'outlined'} color={'info'}>Send</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameTextField;
