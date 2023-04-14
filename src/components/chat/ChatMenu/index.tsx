import ChatType from "@/components/chat/ChatType";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IChat } from "@/models/IChat";
import { selectMenu, selectMenuType, setMenu } from "@/store/slices/menuSlice";
import React, { useEffect, useState } from "react";
import styles from "./ChatMenu.module.scss";

interface ChatMenuProps {
  chats?: IChat[];
}

const ChatMenu: React.FC<ChatMenuProps> = ({ chats }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const menu = useAppSelector(selectMenu);
  const menuType = useAppSelector(selectMenuType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chats) {
      // @ts-ignore
      dispatch(setMenu(chats));
    }
  }, [chats, dispatch]);

  return (
    <div className={styles.menu} onClick={() => setIsSearchActive(false)}>
      {menuType === "all" ? (
        <ChatType
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          chats={menu}
          type={menuType}
        />
      ) : (
        <ChatType
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          chats={menu?.filter((item: any) => item.type === menuType)}
          type={menuType}
        />
      )}
    </div>
  );
};

export default ChatMenu;
