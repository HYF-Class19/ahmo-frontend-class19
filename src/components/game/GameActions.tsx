import { Button } from "@mui/material";
import React from "react";
import styles from "./GameTextField/GameTextField.module.scss";

interface GameActionsProps {
  isDisabled: boolean;
  sendResponse: Function;
  values: string[];
}

const GameActions: React.FC<GameActionsProps> = ({
  isDisabled,
  sendResponse,
  values,
}) => {
  return (
    <div className={styles.buttons}>
      {values.map((value, i) => (
        <Button
          key={i}
          onClick={() => sendResponse(value)}
          className={styles.boolBtn}
          variant="contained"
          color="warning"
          disabled={isDisabled}
        >
          {value.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default GameActions;
