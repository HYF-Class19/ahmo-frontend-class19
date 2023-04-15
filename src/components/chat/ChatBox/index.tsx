import ChatTextarea from "@/components/chat/ChatTextarea";
import Message from "@/components/chat/Message";
import SelectChatTemplate from "@/components/shared/SelectChatTemplate";
import { useAppSelector } from "@/hooks/useAppHooks";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IMessage } from "@/models/IMessage";
import { IUser } from "@/models/IUser";
import { useFetchChatWithMessagesQuery } from "@/services/chatService";
import { selectActiveChat } from "@/store/slices/chatSlice";
import { selectUserData } from "@/store/slices/userSlice";
import {
  getDirectName,
  getReceivers,
  isAvatarUnvisible,
} from "@/utils/chatHelpers";
import { socket } from "@/utils/socket";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "../ChatHeader";
import ChatSetting from "../ChatSetting";
import styles from "./ChatBox.module.scss";

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const [open, setOpen] = React.useState(false);
  const activeChat = useAppSelector(selectActiveChat);
  const userData = useAppSelector(selectUserData);
  const [someoneTyping, setSomeoneTyping] = useState<{
    sender: IUser;
    chatId: number;
  } | null>(null);
  const [oldData, setOldData] = useState<any>();
  const { data, isLoading } = useFetchChatWithMessagesQuery(
    activeChat.activeChat
  );
  const scrollRef = useRef<any>();
  const boxRef = useRef<any>();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (boxRef.current && oldData?.id !== data?.id) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
    setOldData(data);
  }, [data, oldData?.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  useEffect(() => {
    socket.on("getTyping", (data: { sender: IUser; chatId: number }) => {
      if (data.sender.id !== userData?.id) {
        setSomeoneTyping(data);
      }
    });
    socket.on("getStopTyping", () => {
      setSomeoneTyping(null);
    });

    return () => {
      socket.off("getTyping");
      socket.off("getStopTyping");
    };
  }, [userData?.id]);

  return (
    <div className={styles.chatBoxWrapper}>
      {activeChat.activeChat && userData ? (
        <>
          <ChatHeader
            chat={activeChat.type !== "direct" && data}
            user={
              activeChat.type === "direct" &&
              getDirectName(userData.id, data?.members)
            }
            setSettingOpen={setOpen}
          />
          {data && (
            <ChatSetting
              members={data.members}
              chat={data}
              open={open}
              setOpen={setOpen}
            />
          )}
          <div className={styles.chatBoxTop}>
            <div
              className={styles.messagesBox}
              ref={boxRef}
              style={{ overflowY: "auto" }}
            >
              {data?.messages ? (
                data.messages.length > 0 ? (
                  data.messages.map((message: IMessage, i) => (
                    <div key={message.id} ref={scrollRef}>
                      <Message
                        isAvatarUnvisible={isAvatarUnvisible(
                          userData.id,
                          message,
                          data.messages,
                          i
                        )}
                        key={message.id}
                        isMy={message.sender.id === userData?.id}
                        message={message}
                      />
                    </div>
                  ))
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%)",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "lightgrey",
                        p: 4,
                        bgcolor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      No messages yet
                    </Typography>
                  </Box>
                )
              ) : (
                Array.from(new Array(10)).map((item, i) => (
                  <Message
                    isAvatarUnvisible={false}
                    key={i}
                    isMy={false}
                    message={item}
                  />
                ))
              )}
              {someoneTyping &&
                someoneTyping.chatId === activeChat.activeChat && (
                  <div>{someoneTyping?.sender?.fullName} is typing...</div>
                )}
            </div>
            <ChatTextarea
              activeChatId={activeChat.activeChat}
              receivers={getReceivers(userData.id, activeChat?.members)}
            />
          </div>
        </>
      ) : (
        <SelectChatTemplate typeOfChat={"group"} />
      )}
    </div>
  );
};

export default ChatBox;
