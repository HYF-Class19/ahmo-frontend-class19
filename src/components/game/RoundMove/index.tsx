import React from 'react';
import {IMove} from "@/models/IGame";
import styles from './RoundMove.module.scss'
import {useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {Avatar} from "@mui/material";
import {format} from "timeago.js";

interface RoundMoveProps {
    move: IMove;
}
const RoundMove: React.FC<RoundMoveProps> = ({move}) => {
    const userData = useAppSelector(selectUserData)

    return (
        <div className={styles.moveBox}>
            <Avatar>
                {userData?.fullName ? userData.fullName[0] : 'A'}
            </Avatar>
            <p className={styles.message}>{move.move_data}</p>
            <p className={styles.date}>
                {format(move.createdAt)}
            </p>
        </div>
    );
};

export default RoundMove;
