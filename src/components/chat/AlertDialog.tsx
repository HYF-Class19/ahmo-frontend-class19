import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    title: string
    open: boolean;
    setOpen: Function
    setConfirm: Function
}

const AlertDialog: React.FC<AlertDialogProps> = ({title, open ,setOpen, setConfirm}) => {
  const handleClose = () => {
    setOpen(false);
    setConfirm(false)
  }
  const handleConfirm = () => {
    setConfirm(true)
    setOpen(false)
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button color={'error'} variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button color={'success'} variant='contained' onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default AlertDialog