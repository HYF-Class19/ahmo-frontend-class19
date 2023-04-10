import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { Title } from '@mui/icons-material';


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
    setOpen: Function
}

const ChatSetting: React.FC<ChatSettingProps> = ({open, setOpen}) => {
    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Group Info
          </DialogTitle>
          <DialogContent sx={{ minWidth: '400px'}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: '20px'}}>
                <Avatar sx={{height: 60, width: 60, mr:'20px'}}/>
                <Typography gutterBottom variant="h5" component="div">
                    Group name
                </Typography>
            </Box>
            <Divider />
            <Box sx={{mt: 2}}>
                <Box sx={{display: 'flex', alignItems: 'end', px: 2}}>
                    <PeopleIcon sx={{height: 40, width: 40, mr:2}} />
                    <Typography variant={'h6'}> Chat members</Typography>
                </Box>
            <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'apodnes@gmail.com'} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'apodnes@gmail.com'} />
            </ListItemButton>
          </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
    );
}

export default ChatSetting