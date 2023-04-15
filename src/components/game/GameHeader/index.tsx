import CustomAvatar from "@/components/shared/CustomAvatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { useIsLaptop } from "@/hooks/useIsMobile";
import { removeActiveChat, selectActiveChat } from "@/store/slices/chatSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./GameHeader.module.scss";

const GameHeader = () => {
  const activeChat = useAppSelector(selectActiveChat);
  const isLaptop = useIsLaptop();
  const dispatch = useAppDispatch();

  const back = () => {
    dispatch(removeActiveChat());
  };

  if (!activeChat.activeChat) return null;

  return (
    <header className={styles.header}>
      {isLaptop && (
        <ArrowBackIosIcon
          onClick={back}
          color={"warning"}
          sx={{ mr: 2, cursor: "pointer" }}
        />
      )}
      <div className={styles.chatName}>
        <h3>{activeChat.name}</h3>
      </div>
      <div className={styles.status}>
        <CustomAvatar user={activeChat.members[0].user} />
        {activeChat.game !== "words" && (
          <div className={styles.score}>
            <h4>Score:</h4>
            <p>
              {activeChat.members[0]?.score} : {activeChat.members[1]?.score}
            </p>
          </div>
        )}
        <CustomAvatar user={activeChat.members[1].user} />
      </div>
      <div className={styles.chatName}>
        <h2>{activeChat.game}</h2>
      </div>
    </header>
  );
};

export default GameHeader;
