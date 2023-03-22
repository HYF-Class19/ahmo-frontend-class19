import {IUser} from "@/models/IUser";
import {IMember} from "@/models/IChat";
import {IRound} from "@/models/IGame";

interface gameState {
    id: number | null;
    name: string;
    game: string;
    createdAt: string;
    admin: IUser;
    members: IMember[];
    rounds: IRound[];
}