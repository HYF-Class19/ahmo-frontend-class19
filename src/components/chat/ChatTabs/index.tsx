import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { menuType, selectMenuType, setType } from "@/store/slices/menuSlice";
import { Button } from "@mui/material";
import React from "react";
import styles from "./ChatTabs.module.scss";

interface ChatTabsProps {
  setIsActive: (isActive: boolean) => void;
  ref?: any;
}

const ChatTabs: React.FC<ChatTabsProps> = ({ setIsActive, ref }) => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(selectMenuType);

  return (
    <div className={styles.tabs}>
      <ul>
        <li onClick={() => dispatch(setType(menuType.all))}>
          <Button
            color="warning"
            variant={selectedType === "all" ? "contained" : "text"}
          >
            All
          </Button>
        </li>
        <li onClick={() => dispatch(setType(menuType.direct))}>
          <Button
            color="warning"
            variant={selectedType === "direct" ? "contained" : "text"}
          >
            Direct chats
          </Button>
        </li>
        <li onClick={() => dispatch(setType(menuType.group))}>
          <Button
            color="warning"
            variant={selectedType === "group" ? "contained" : "text"}
          >
            Groups
          </Button>
        </li>
        <li onClick={() => dispatch(setType(menuType.game))}>
          <Button
            color="warning"
            variant={selectedType === "game" ? "contained" : "text"}
          >
            Chat Games
          </Button>
        </li>
        <li onClick={() => setIsActive(true)}>
          <Button color="warning" variant={"outlined"}>
            Create Chat
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ChatTabs;
