import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";
import React, { ReactNode, useCallback, useEffect } from "react";

interface GameAlertProps {
  severity?: AlertColor;
  children: ReactNode;
  open: boolean;
  setOpen: Function;
  setAlertContent: Function;
}

const GameAlert: React.FC<GameAlertProps> = ({
  severity,
  children,
  setOpen,
  open,
  setAlertContent,
}) => {
  const getAlertSx = (): React.CSSProperties => {
    return {
      borderRadius: "0.5rem",
      padding: "1rem",
      fontWeight: "bold",
      ...(severity === "error" && {
        boxShadow: "0px 0px 5px 2px rgba(255, 0, 0, 0.2)",
      }),
    };
  };

  const handleCloseAlert = useCallback(() => {
    setOpen(false);
    setAlertContent("");
  }, [setOpen, setAlertContent]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        handleCloseAlert();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [open, handleCloseAlert]);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        onClose={() => {
          setAlertContent("");
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={getAlertSx()}
      >
        {children}
      </Alert>
    </Collapse>
  );
};

export default GameAlert;
