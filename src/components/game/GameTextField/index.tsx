import React, {useState} from 'react';
import styles from './GameTextField.module.scss'
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useCreateMoveMutation, useCreateRoundMutation, useUpdateRoundDataMutation} from "@/services/roundServive";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat, selectMembers} from "@/store/slices/chatSlice";
import {addMove, addRoundData, selectActiveRound, setRound} from '@/store/slices/roundSlice'
import {selectUserData} from "@/store/slices/userSlice";
import {IMember} from "@/models/IChat";

const GameTextField = () => {
    const [moveData, setMoveData] = useState<string>()
    const [moveType, setMoveType] = useState<string>()
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
        console.log(activeRound)
        if ((answer || moveData) && (moveType || answer) && activeRound) {
            const result = await createMove({move_data: moveData || answer, move_type: moveType || 'answer', roundId: activeRound.id})
            console.log("yes")
            // @ts-ignore
            const move = result.data
            if(move) {
                dispatch(addMove(move))
                if(move.correct) {
                    const newRiddler = members.find((m: IMember) => m.user.id !== activeRound?.riddler?.id)
                    if(newRiddler) {
                        console.log(newRiddler)
                        const res = await createRound({riddlerId: newRiddler.user.id, chatId: activeGame.activeChat})
                        // @ts-ignore
                        const newRound = res.data
                        if(newRound) {
                            dispatch(setRound(newRound))
                        }
                    }
                }
            }
        }
        setMoveType('')
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
                            <div>
                                <TextField
                                    id="round_data"
                                    label="Multiline"
                                    multiline
                                    rows={4}
                                    placeholder={'place your move data here'}
                                    value={roundData}
                                    onChange={(e) => setRoundData(e.target.value)}
                                    variant="standard"
                                />
                                <div className={styles.btnSection}>
                                    <Button onClick={updateWord} variant={'outlined'} color={'info'}>Send</Button>
                                </div>
                            </div>
                        )
            ) : (
                <div className={styles.textfield}>
                    <TextField
                        id="move_data"
                        label="Multiline"
                        multiline
                        rows={4}
                        placeholder={'place your move data here'}
                        value={moveData}
                        onChange={(e) => setMoveData(e.target.value)}
                        variant="standard"
                    />
                    <div>
                        <InputLabel id="input-type">Type of propose</InputLabel>
                        <Select
                            id="input-type"
                            value={moveType}
                            onChange={(e) => setMoveType(e.target.value)}
                            label="input type"
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
