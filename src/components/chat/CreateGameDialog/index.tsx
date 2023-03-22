import React, {useState} from 'react';
import {useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useSearchUsersQuery} from "@/services/authService";
import {useCreateGroupMutation} from "@/services/chatService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {TextField} from "@mui/material";
import styles from "@/components/chat/CreateChatDialog/CreateChatDialog.module.scss";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useCreateGameMutation} from "@/services/gameService";

interface CreateGameDialogProps {
    open: boolean;
    setOpen: Function;
}
const CreateGameDialog: React.FC<CreateGameDialogProps> = ({open, setOpen}) => {
    const [activeStep, setActiveStep] = useState(0);
    const userData = useAppSelector(selectUserData)!
    const [name, setName] = useState<string>('');
    const [game, setGame] = useState<string>('');
    const [query, setQuery] = useState<string>('')
    const [members, setMembers] = useState<number[]>([userData.id]);
    const {data, isLoading, error} = useSearchUsersQuery(query)
    const [createGame, {}] = useCreateGameMutation()

    const handleClose = () => {
        setOpen(false);
    }

    const handleNext = () => {
        if(activeStep < 2) {
            setActiveStep(activeStep + 1)
        } else {
            createGame({members: members.join(','), game, type: "game", name})
            setOpen(false)
        }
    }

    const addMember = (id: number) => {
        if(members.includes(id)) {
            setMembers(prev => prev.filter((member) => member !== id))
        } else {
            setMembers(prev => ([id]))
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
                )},
                {activeStep === 1 && (
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        label="Game Name"
                        multiline
                        maxRows={4}
                        variant="filled"
                    />
                )}
                {activeStep === 2 && (
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
};

export default CreateGameDialog;