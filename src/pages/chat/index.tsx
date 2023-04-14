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
import { selectMenuType } from "@/store/slices/menuSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { redirect } from "@/utils/redirect";
import { socket } from "@/utils/socket";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styles from "../../styles/Chat.module.scss";

interface ChatProps {
  isAuth: boolean;
}

const Chat: NextPage<ChatProps> = ({ isAuth }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<IChat[]>([]);
  const { data, error, isLoading } = useFetchChatsQuery();
  const userData = useAppSelector(selectUserData);
  const activeChat = useAppSelector(selectActiveChat);
  const router = useRouter();
  const selectedType = useAppSelector(selectMenuType);

  if (!isAuth) {
    router.push("/404");
  }

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
            <ChatTabs setIsActive={setIsOpen} />
            <div className={styles.chatWrapper}>
              <div className={styles.chatMenu}>
                <ChatMenu chats={data} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (!cookies.authToken) {
    redirect(ctx, "/auth/login");
  }
  if (cookies.authToken) {
    return {
      props: {
        isAuth: true,
      },
    };
  } else {
    return {
      props: {
        isAuth: false,
      },
    };
  }
};

export default Chat;
