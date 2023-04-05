import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatBox.module.scss";
import Message from "@/components/chat/Message";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { loadMessages, selectActiveChat } from "@/store/slices/chatSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { ArrivingMessage, IMessage } from "@/models/IMessage";
import { IUser } from "@/models/IUser";
import ChatTextarea from "@/components/chat/ChatTextarea";
import { getReceivers } from "@/utils/chatHelpers";
import { socket } from "@/utils/socket";
import { useFetchChatWithMessagesQuery } from "@/services/chatService";
import { messageAdded } from "@/store/slices/menuSlice";

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const activeChat = useAppSelector(selectActiveChat);
  const userData = useAppSelector(selectUserData);
  const [someoneTyping, setSomeoneTyping] = useState<{
    sender: IUser;
    chatId: number;
  } | null>(null);
  const [oldData, setOldData] = useState<any>()
  const {data, isLoading} = useFetchChatWithMessagesQuery(activeChat.activeChat)
  const dispatch = useAppDispatch();
  const scrollRef = useRef<any>();
  const boxRef = useRef<any>()

  useEffect(() => {
    if (boxRef.current && oldData?.id !== data?.id) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
    setOldData(data)
  }, [data]);
  

  useEffect(() => {
    if(data) {
        dispatch(loadMessages(data.messages))
    }
}, [data])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  useEffect(() => {
    socket.on("getTyping", (data: { sender: IUser; chatId: number }) => {
      if (data.sender.id !== userData?.id) {
        setSomeoneTyping(data);
      }
    });
    socket.on("getStopTyping", () => {
      setSomeoneTyping(null);
    });
  }, []);

  return (
    <div className={styles.chatBoxWrapper}>
      {activeChat.activeChat && userData ? (
        <>
          <div className={styles.chatBoxTop}>
            <div ref={boxRef} style={{ overflowY: "auto" }}>
              {isLoading && <div>loading...</div>}
              {data?.messages ? (
                data.messages.length > 0 ? (
                    data.messages
                    .map((message: IMessage) => (
                      <div key={message.id} ref={scrollRef}>
                        <Message
                          key={message.id}
                          isMy={message.sender.id === userData?.id}
                          message={message}
                        />
                      </div>
                    ))
                ) : (
                  <h3>No messages yet</h3>
                )
              ) : null}
              {someoneTyping &&
                someoneTyping.chatId === activeChat.activeChat && (
                  <div>{someoneTyping?.sender?.fullName} is typing...</div>
                )}
            </div>
          </div>
          <ChatTextarea
            activeChatId={activeChat.activeChat}
            receivers={getReceivers(userData.id, activeChat?.members)}
          />
        </>
      ) : (
        <div className={styles.noConversation}>
          <h2>Open a conversation to start chat</h2>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
