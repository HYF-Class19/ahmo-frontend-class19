import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import { Title } from "@mui/icons-material";
import { IChat, IMember } from "@/models/IChat";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData } from "@/store/slices/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AlertDialog from "../AlertDialog";
import {
  useDeleteChatMutation,
  useRemoveMemberMutation,
} from "@/services/chatService";
import { removeActiveChat } from "@/store/slices/chatSlice";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

interface ChatSettingProps {
  open: boolean;
  setOpen: Function;
  members: IMember[];
  chat: IChat;
}

const ChatSetting: React.FC<ChatSettingProps> = ({
  open,
  setOpen,
  members,
  chat,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState<boolean | null>();
  const [typeOfConfirm, setTypeOfConfirm] = React.useState<string>();
  const [memberId, setMemberId] = React.useState<number>();

  const [removeMember, result] = useRemoveMemberMutation();
  const [deleteChat, deleteResult] = useDeleteChatMutation();

  const userData = useAppSelector(selectUserData);
  const openAnchor = Boolean(anchorEl);
  const dispatch = useAppDispatch()


  const handleClickAnchor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setConfirm(null);
    setAnchorEl(null);
  };

  const leaveGroup = async () => {
    if (userData?.id) {
      await removeMember(userData.id);
    }
    handleCloseAnchor();
  };

  const deleteGroup = async () => {
    try {
      await deleteChat(chat.id);
      dispatch(removeActiveChat())
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
    handleCloseAnchor();
  };

  const deletePerson = async () => {
    if (memberId) {
      await removeMember(memberId);
    }
    setConfirm(null);
  };

  const openConfirmation = (action: string) => {
    setTypeOfConfirm(action);
    setOpenAlertDialog(true);
  };

  React.useEffect(() => {
    if (confirm) {
      if (typeOfConfirm === "leave") {
        leaveGroup();
      } else if (typeOfConfirm === "delete") {
        deleteGroup();
      } else {
        deletePerson();
      }
    } else {
      handleCloseAnchor();
    }
  }, [confirm]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <AppBar
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Group info
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ minWidth: "400px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "20px",
              width: "100%",
            }}
          >
            <Avatar sx={{ height: 60, width: 60, mr: "20px" }} />
            <Typography gutterBottom variant="h5" component="div">
              {chat.name}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openAnchor ? "long-menu" : undefined}
                aria-expanded={openAnchor ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickAnchor}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={openAnchor}
                onClose={handleCloseAnchor}
              >
                {userData?.id === chat.admin.id ? (
                  <MenuItem onClick={() => openConfirmation("delete")}>
                    <HighlightOffIcon color="error" />
                    <Typography sx={{ ml: 2 }}>Delete grop</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => openConfirmation("leave")}>
                    <LogoutIcon />
                    <Typography sx={{ ml: 2 }}>Leave group</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "end", px: 2 }}>
              <PeopleIcon sx={{ height: 40, width: 40, mr: 2 }} />
              <Typography variant={"h6"}>Chat members</Typography>
            </Box>
            <List sx={{ pt: 0 }}>
              {members.map((member) => (
                <ListItem
                  secondaryAction={
                    <>
                    {member.user?.id === chat.admin.id && <Typography sx={{ color: "gray" }}>admin</Typography>}
                    {userData?.id === chat.admin.id && member.user?.id !== chat.admin.id && (
                      <IconButton
                        onClick={() => {
                          openConfirmation("remove");
                          setMemberId(member.id);
                        }}
                        edge="start"
                        aria-label="delete"
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                    )}
                    </>
                  }
                  key={member.id}
                  disableGutters
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.user.fullName}
                      secondary={member.user.email}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              {userData?.id === chat.admin.id && (
                <ListItem disableGutters>
                  <ListItemButton autoFocus>
                    <ListItemAvatar>
                      <Avatar>
                        <AddIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add member" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={openAlertDialog}
        setConfirm={setConfirm}
        setOpen={setOpenAlertDialog}
        title={"Are you sure?"}
      />
    </>
  );
};

export default ChatSetting;
