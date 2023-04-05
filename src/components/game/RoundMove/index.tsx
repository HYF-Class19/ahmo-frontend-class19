import React from "react";
import { IMove } from "@/models/IGame";
import styles from "./RoundMove.module.scss";
import { useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData } from "@/store/slices/userSlice";
import { Avatar } from "@mui/material";
import { format } from "timeago.js";
import clsx from "clsx";

interface RoundMoveProps {
  move: IMove;
  my: boolean;
}
const RoundMove: React.FC<RoundMoveProps> = ({ move, my }) => {
  const userData = useAppSelector(selectUserData);

  return (
    <div className={clsx(styles.moveWrapper, my && styles.my)}>
      <div className={styles.avatar}>
        <Avatar>{ move?.player?.fullName && move?.player?.fullName[0] }</Avatar>
      </div>
      <div className={clsx(styles.moveBox, my && styles.myBox)}>
        <p className={styles.message}>{move.move_data}</p>
        <p className={styles.date}>{format(move.createdAt)}</p>
      </div>
    </div>
  );
};

export default RoundMove;
