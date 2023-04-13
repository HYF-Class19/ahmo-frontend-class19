import Conversation from "@/components/chat/Conversation";
import SearchBar from "@/components/shared/SearchBar";
import { IChat } from "@/models/IChat";
import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./ChatType.module.scss";

interface ChatTypeProps {
  chats: IChat[] | null;
  type: "group" | "direct" | "game" | "all";
  isSearchActive: boolean;
  setIsSearchActive: Function;
}

const ChatType: React.FC<ChatTypeProps> = ({
  chats,
  type,
  setIsSearchActive,
  isSearchActive,
}) => {
  return (
    <div className={styles.wrapper}>
      {chats ? (
        <SearchBar
          placeholder="search..."
          isActive={isSearchActive}
          setActive={setIsSearchActive}
          searchType={type}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={"90%"}
          height={60}
          sx={{ mb: 6 }}
        />
      )}
      {!isSearchActive && (
        <div style={{ overflowY: "auto" }}>
          {(!chats ? Array.from(new Array(10)) : chats).map(
            (chat: IChat, i) => (
              <Conversation key={chat ? chat.id : i} chat={chat} />
            )
          )}
        </div>
      )}
      {chats && !chats.length && (
        <div>You have no {type} chats, maybe create one?</div>
      )}
    </div>
  );
};

export default ChatType;
