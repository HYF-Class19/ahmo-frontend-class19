import React from "react";
import { IMove } from "@/models/IGame";
import styles from "./RoundMove.module.scss";
import { format } from "timeago.js";
import clsx from "clsx";
import CustomAvatar from "@/components/shared/CustomAvatar";

interface RoundMoveProps {
  move: IMove;
  my: boolean;
}
const RoundMove: React.FC<RoundMoveProps> = ({ move, my }) => {

  return (
    <div className={clsx(styles.moveWrapper, my && styles.my)}>
      <div className={styles.avatar}>
      <CustomAvatar user={move?.player} />
      </div>
      <div className={clsx(styles.moveBox, my && styles.myBox)}>
        <p className={styles.message}>{move.move_data}</p>
        <p className={styles.date}>{format(move.createdAt)}</p>
      </div>
    </div>
  );
};

export default RoundMove;
