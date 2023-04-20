import CreateItem from "@/components/shared/CreateItem";
import { useAppSelector } from "@/hooks/useAppHooks";
import { IChat } from "@/models/IChat";
import { IUser } from "@/models/IUser";
import { useSearchUsersQuery } from "@/services/authService";
import {
  useCreateGroupMutation,
  useGetChatByTypeQuery,
} from "@/services/chatService";
import { useCreateGameMutation } from "@/services/gameService";
import { selectUserData } from "@/store/slices/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { useState } from "react";
import styles from "./CreateChatDialog.module.scss";

interface FormDialogProps {
  open: boolean;
  setOpen: Function;
  setChats: Function;
  type: string;
}

const CreateChatDialog: React.FC<FormDialogProps> = ({
  open,
  setOpen,
  setChats,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const userData = useAppSelector(selectUserData)!;
  const [name, setName] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [members, setMembers] = useState<number[]>([]);
  const [directMember, setDirectMember] = useState<number>();
  const [chosenGame, setChosenGame] = useState<string>("");
  const [chatType, setChatType] = useState<"group" | "direct" | "game">();
  const {
    data: directChats,
    isLoading: isDirectChatsLoading,
    error: directError,
  } = useGetChatByTypeQuery("direct");
  const { data, isLoading, error } = useSearchUsersQuery({
    query,
    type: "direct",
  });
  const [createGroup, chatsResult] = useCreateGroupMutation();
  const [createGame, gameResult] = useCreateGameMutation();

  const handleClose = () => {
    setActiveStep(0);
    setName("");
    setQuery("");
    setMembers([]);
    setOpen(false);
  };

  const handleNext = async () => {
    if (activeStep < 3) {
      if (activeStep === 1 && chatType !== "game") {
        setActiveStep((prev) => prev + 2);
      } else if (activeStep === 0 && chatType === "direct") {
        setActiveStep((prev) => prev + 3);
      } else {
        setActiveStep(activeStep + 1);
      }
    } else {
      if (chatType === "game") {
        if (!chosenGame || members.length < 1 || !name) return;
        await createGame({
          members: [userData?.id, ...members].join(","),
          game: chosenGame,
          type: "game",
          name,
        });
        if (gameResult.data) {
          setChats((prev: IChat[]) => [...prev, chatsResult.data]);
        }
      } else if (chatType === "direct") {
        let chat;
        if (directChats) {
          chat = directChats.find(
            (chat) =>
              chat.members.find((m) => m.user.id !== userData?.id)?.user.id ===
              directMember
          );
        }

        if (chat) {
          alert("direct chat with that user already exist");
        } else {
          await createGroup({
            type: "direct",
            members: [directMember, userData?.id].join(","),
          });
          if (chatsResult.data) {
            setChats((prev: IChat[]) => [...prev, chatsResult.data]);
          }
        }
      } else {
        if (members.length < 1 || !name) return;
        await createGroup({
          type: "group",
          name,
          members: [userData?.id, ...members].join(","),
        });
        if (chatsResult.data) {
          setChats((prev: IChat[]) => [...prev, chatsResult.data]);
        }
      }
      handleClose();
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      PaperProps={{
        sx: { backgroundColor: "#1A1E28" },
      }}
      className={styles.dialog}
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ color: "white" }}>
        {activeStep === 0 && (
          <>
            <h2 className={styles.cardTitle}>Choose a chat type</h2>
            <ul>
              {["direct", "group", "game"].map((type, i) => (
                <div key={i}>
                  <CreateItem
                    value={type}
                    content={type}
                    values={chatType}
                    type={"radio"}
                    radioName="chat-type"
                    setValue={setChatType}
                  />
                </div>
              ))}
            </ul>
          </>
        )}
        {activeStep === 1 && (
          <>
            <h2 className={styles.cardTitle}>Choose a chat name</h2>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: "5px",
                  border: "1px solid #F3FB8C",
                  color: "lightgray",
                  textAlign: "center",
                  outline: "none",
                },
                placeholder: "Type group name...",
              }}
            />
          </>
        )}
        {chatType === "game" && activeStep === 2 && (
          <>
            <h2 className={styles.cardTitle}>Choose a game</h2>
            {["guess a word", "truth or dare", "words"].map((game, i) => (
              <div key={i}>
                <CreateItem
                  value={game}
                  content={game}
                  values={chosenGame}
                  type={"radio"}
                  radioName="chat-game"
                  setValue={setChosenGame}
                />
              </div>
            ))}
          </>
        )}
        {activeStep === 3 && (
          <div>
            <h2 className={styles.cardTitle}>Choose a chat members</h2>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="members"
              fullWidth
              placeholder="Search for people"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "#F3FB8C", mr: "10px" }} />
                ),
                sx: {
                  outline: "none",
                  bgcolor: "black",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                  mb: "20px",
                  color: "white",
                  "& ::placeholder": {
                    color: "lightgray",
                    opacity: 1,
                  },
                },
              }}
            />
            <ul className={styles.members}>
              {isLoading && <div>loading...</div>}
              {error && <div>error</div>}
              {data &&
                data.map((user: IUser) => (
                  <React.Fragment key={user.id}>
                    {chatType === "direct" ? (
                      <CreateItem
                        content={user.fullName}
                        avatar={user.fullName[0]}
                        image_url={user.image_url}
                        value={user.id}
                        values={directMember}
                        type={"radio"}
                        radioName="direct-member"
                        setValue={setDirectMember}
                      />
                    ) : (
                      <CreateItem
                        content={user.fullName}
                        avatar={user.fullName[0]}
                        image_url={user.image_url}
                        value={user.id}
                        values={members}
                        type={"checkbox"}
                        setValue={setMembers}
                      />
                    )}
                  </React.Fragment>
                ))}
            </ul>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around", marginY: "10px" }}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ width: "100px" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          sx={{ width: "100px" }}
          onClick={handleNext}
        >
          {activeStep === 3 ? "Create" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChatDialog;
