import CustomAvatar from "@/components/shared/CustomAvatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton } from "@mui/material";
import React from "react";
import styles from "./ChatHeader.module.scss";

interface ChatHeaderProps {
  setSettingOpen: Function;
  chat?: any;
  user?: any;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  setSettingOpen,
  chat,
  user,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.chatInfo}>
        <CustomAvatar chat={chat} mr={2} user={user} width={50} height={50} />
        {user?.fullName || chat?.name}
      </div>
      <IconButton
        onClick={() => setSettingOpen(true)}
        color={"warning"}
        sx={{ mr: "20px" }}
      >
        <SettingsOutlinedIcon sx={{ width: "30px", height: "30px" }} />
      </IconButton>
    </div>
  );
};

export default ChatHeader;
