import React, {useState} from 'react';
import styles from './GameTextField.module.scss'
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useCreateMoveMutation, useCreateRoundMutation} from "@/services/roundServive";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {addMove, selectActiveChat, selectActiveRound, selectMembers} from "@/store/slices/chatSlice";
import {selectUserData} from "@/store/slices/userSlice";
import {IMember} from "@/models/IChat";

const GameTextField = () => {
    const [moveData, setMoveData] = useState<string>()
    const [moveType, setMoveType] = useState<string>()
    const [createMove] = useCreateMoveMutation()
    const userData = useAppSelector(selectUserData)
    const members = useAppSelector(selectMembers)
    const activeGame = useAppSelector(selectActiveChat)
    const activeRound = useAppSelector(selectActiveRound)
    const [createRound,] = useCreateRoundMutation()
    const dispatch = useAppDispatch()

    const sendResponse = async (answer?: string) => {
        if ((answer || moveData) && (moveType || answer)) {
            const result = await createMove({move_data: moveData || answer, move_type: moveType || 'answer', roundId: activeRound.id})
            console.log("yes")

            // @ts-ignore
            const move = result.data
            console.log(move)
            if(move) {
                dispatch(addMove(move))
                if(move.correct) {
                    const newRiddler = members.find((m: IMember) => m.user.id !== activeRound.riddler.id)
                    console.log(members)
                    if(newRiddler) {
                        console.log(newRiddler)
                        await createRound({riddlerId: newRiddler.user.id, chatId: activeGame.activeChat})
                    }
                }
            }
        }
        setMoveType('')
        setMoveData('')
    }

    return (
        <div className={styles.wrapper}>
            {userData && activeRound &&
                activeRound.riddler.id === userData.id ? (
                <div className={styles.buttons}>
                    <Button onClick={() => sendResponse('yes')}>Yes</Button>
                    <Button onClick={() => sendResponse('no')}>No</Button>
                </div>
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
                            labelId="demo-simple-select-standard-label"
                            id="input-type"
                            value={moveType}
                            onChange={(e) => setMoveType(e.target.value)}
                            label="Age"
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
