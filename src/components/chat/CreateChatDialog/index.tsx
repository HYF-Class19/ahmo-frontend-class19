import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {TextField} from "@mui/material";
import styles from './CreateChatDialog.module.scss'
import {useSearchUsersQuery} from "@/services/authService";
import {useCreateGroupMutation} from "@/services/chatService";
import {useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";

interface FormDialogProps {
    open: boolean;
    setOpen: Function;
}

const CreateChatDialog: React.FC<FormDialogProps> = ({open, setOpen}) => {
    const [activeStep, setActiveStep] = useState(0);
    const userData = useAppSelector(selectUserData)!
    const [name, setName] = useState<string>('');
    const [query, setQuery] = useState<string>('')
    const [members, setMembers] = useState<number[]>([userData.id]);
    const {data, isLoading, error}  = useSearchUsersQuery(query)
    const [createGroup, {}] = useCreateGroupMutation()

    const handleClose = () => {
        setOpen(false);
    }

    const handleNext = () => {
        if(activeStep === 0) {
            setActiveStep(activeStep + 1)
        } else {
            createGroup({type: "group", name, members: members.join(',')})
            setOpen(false)
        }
    }

    const addMember = (id: number) => {
        if(members.includes(id)) {
            setMembers(prev => prev.filter((member) => member !== id))
        } else {
            setMembers(prev => ([...prev, id]))
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a group</DialogTitle>
            <DialogContent>
                {activeStep === 0 && (
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        label="Group Name"
                        multiline
                        maxRows={4}
                        variant="filled"
                    />
                )}
                {activeStep === 1 && (
                    <div>
                        <TextField
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            id="members"
                            label="add members"
                            multiline
                            maxRows={4}
                            variant="filled"
                        />
                        <ul className={styles.members}>
                            {isLoading && <div>loading...</div>}
                            {error && <div>error</div>}
                            {data && data.map((user) => (
                                <li key={user.id} onClick={() => addMember(user.id)}>
                                    {user.fullName} {members.includes(user.id) && <span>✓</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleNext}>Next</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateChatDialog;