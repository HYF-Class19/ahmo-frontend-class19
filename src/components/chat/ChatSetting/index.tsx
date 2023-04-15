import { useCallback } from "react";

import CustomAvatar from "@/components/shared/CustomAvatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IChat, IMember } from "@/models/IChat";
import {
  useDeleteChatMutation,
  useRemoveMemberMutation,
  useUpdateChatMutation,
} from "@/services/chatService";
import { removeActiveChat } from "@/store/slices/chatSlice";
import { selectUserData } from "@/store/slices/userSlice";
import { getDirectName } from "@/utils/chatHelpers";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper, { PaperProps } from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/router";
import * as React from "react";
import Draggable from "react-draggable";
import AlertDialog from "../AlertDialog";

interface DraggablePaperProps extends PaperProps {}

function DraggablePaper(props: DraggablePaperProps) {
  const paperRef = React.useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <div ref={paperRef}>
        <Paper {...props} />
      </div>
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
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [image_url, setImage_url] = React.useState("");

  const [removeMember, result] = useRemoveMemberMutation();
  const [deleteChat, deleteResult] = useDeleteChatMutation();
  const [updateChat, updateResult] = useUpdateChatMutation();

  const userData = useAppSelector(selectUserData);
  const openAnchor = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClickAnchor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = useCallback(() => {
    setConfirm(null);
    setAnchorEl(null);
  }, []);

  const closeImageDialog = () => {
    setImageDialogOpen(false);
    setImage_url("");
  };

  const leaveGroup = useCallback(async () => {
    if (userData?.id) {
      const member = chat.members.find((m) => m.user.id === userData.id);
      if (member) {
        await removeMember(member.id);
      }
      dispatch(removeActiveChat());
      setOpen(false);
    }
    handleCloseAnchor();
  }, [
    userData?.id,
    chat.members,
    removeMember,
    dispatch,
    setOpen,
    handleCloseAnchor,
  ]);

  const deleteGroup = useCallback(async () => {
    try {
      await deleteChat(chat.id);
      dispatch(removeActiveChat());
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    handleCloseAnchor();
  }, [dispatch, setOpen, handleCloseAnchor, chat.id, deleteChat]);

  const deletePerson = useCallback(async () => {
    if (memberId) {
      await removeMember(memberId);
    }
    setConfirm(null);
  }, [setConfirm, memberId, removeMember]);

  const openConfirmation = (action: string) => {
    setTypeOfConfirm(action);
    setOpenAlertDialog(true);
  };

  const updateImage = async () => {
    if (image_url.length > 5) {
      await updateChat({ chatId: chat.id, image_url });
      closeImageDialog();
    }
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
  }, [
    confirm,
    typeOfConfirm,
    leaveGroup,
    deleteGroup,
    deletePerson,
    handleCloseAnchor,
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaper}
        aria-labelledby="draggable-dialog-title"
      >
        <AppBar
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant="h5"
              component="div"
            >
              {chat.type} info
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
            <Box
              onClick={() => chat.type === "group" && setImageDialogOpen(true)}
              sx={{
                position: "relative",
                cursor: "pointer",
              }}
            >
              <CustomAvatar
                chat={chat.type === "group" ? chat : null}
                width={50}
                height={50}
                user={
                  chat.type === "direct"
                    ? getDirectName(userData!.id, chat.members)
                    : null
                }
              />
              {chat.type === "group" && (
                <AddIcon
                  sx={{
                    position: "absolute",
                    bottom: "-10px",
                    right: 0,
                    width: 30,
                    height: 30,
                    "&:hover": { color: "#23B1D0" },
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{ ml: 3, mb: 0 }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {chat.name || getDirectName(userData!.id, chat.members)?.fullName}
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
                {userData?.id === chat.admin.id || chat.type === "direct" ? (
                  <MenuItem onClick={() => openConfirmation("delete")}>
                    <HighlightOffIcon color="error" />
                    <Typography sx={{ ml: 2 }}>Delete {chat.type}</Typography>
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
                      {member.user?.id === chat.admin.id && (
                        <Typography sx={{ color: "gray" }}>admin</Typography>
                      )}
                      {userData?.id === chat.admin.id &&
                        member.user?.id !== chat.admin.id &&
                        chat.members.length > 2 && (
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
                    <ListItemAvatar
                      onClick={() => router.push(`profile/${member.user.id}`)}
                    >
                      {member.user.image_url ? (
                        <Avatar src={member.user.image_url} />
                      ) : (
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                          <PersonIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.user.fullName}
                      secondary={member.user.email}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              {userData?.id === chat.admin.id && chat.type !== "direct" && (
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
      <Dialog open={imageDialogOpen} onClose={closeImageDialog}>
        <DialogTitle>Change Image</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="image_url"
            label="Image url"
            type="link"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImageDialog}>Cancel</Button>
          <Button onClick={updateImage}>Add image</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatSetting;
