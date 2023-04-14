import ChatType from "@/components/chat/ChatType";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IChat } from "@/models/IChat";
import { selectMenu, setMenu } from "@/store/slices/menuSlice";
import React, { useEffect, useState } from "react";
import styles from "./ChatMenu.module.scss";

interface ChatMenuProps {
  chats?: IChat[];
  selected: "game" | "direct" | "group" | "all";
}

const ChatMenu: React.FC<ChatMenuProps> = ({ chats, selected }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const menu = useAppSelector(selectMenu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chats) {
      // @ts-ignore
      dispatch(setMenu(chats));
    }
  }, [chats]);

  return (
    <div className={styles.menu} onClick={() => setIsSearchActive(false)}>
      {selected === "all" ? (
        <ChatType
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          chats={menu}
          type={selected}
        />
      ) : (
        <ChatType
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          chats={menu?.filter((item: any) => item.type === selected)}
          type={selected}
        />
      )}
    </div>
  );
};

export default ChatMenu;
