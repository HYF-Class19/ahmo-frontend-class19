import ChatBox from "@/components/chat/ChatBox";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatTabs from "@/components/chat/ChatTabs";
import CreateChatDialog from "@/components/chat/CreateChatDialog";
import GameBox from "@/components/game/GameBox";
import { useAppSelector } from "@/hooks/useAppHooks";
import MainLayout from "@/layouts/MainLayout";
import { IChat } from "@/models/IChat";
import { useFetchChatsQuery } from "@/services/chatService";
import { selectActiveChat } from "@/store/slices/chatSlice";
import { selectIsAuth, selectUserData } from "@/store/slices/userSlice";
import { socket } from "@/utils/socket";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../../styles/Chat.module.scss";

const Chat: NextPage = () => {
  const [selectedType, setSelectedType] = useState<
    "game" | "group" | "group" | "all"
  >("all");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<IChat[]>([]);
  const { data, error, isLoading } = useFetchChatsQuery();
  const userData = useAppSelector(selectUserData);
  const isAuth = useAppSelector(selectIsAuth);
  const activeChat = useAppSelector(selectActiveChat);

  useEffect(() => {
    if (userData) {
      socket.emit("addUser", userData);
    }
  }, [userData]);

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data]);

  return (
    <MainLayout>
      {isAuth === false ? (
        "AUTHORIZE"
      ) : (
        <>
          <div className={styles.chat}>
            <ChatTabs
              setSelectedType={setSelectedType}
              setIsActive={setIsOpen}
              selectedType={selectedType}
            />
            <div className={styles.chatWrapper}>
              <div className={styles.chatMenu}>
                <ChatMenu selected={selectedType} chats={data} />
              </div>
              {selectedType === "game" || activeChat.type === "game" ? (
                <GameBox />
              ) : (
                <ChatBox />
              )}
            </div>
          </div>
          <div>
            {chats && (
              <CreateChatDialog
                setChats={setChats}
                open={isOpen}
                setOpen={setIsOpen}
                type={selectedType}
              />
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Chat;
