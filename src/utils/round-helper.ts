import { IMember } from "@/models/IChat";
import { IUser } from "@/models/IUser";
import { roundState } from "@/store/slices/roundSlice";


const isMyTurn = (activeRound: roundState, user: IUser): boolean =>  {
    let isMyTurn;
    if(activeRound.moves?.length) {
        isMyTurn = activeRound.moves[activeRound.moves?.length - 1].player.id !== user.id
     } else {
         isMyTurn = activeRound?.riddler?.id !== user.id
    }
    return isMyTurn
}

const findRiddlerWord = (activeRound: roundState, user: IUser) => {
    if(!activeRound.round_data) {
        if(user.id === activeRound?.riddler?.id) {
            return true
        } else {
            return false
        }
    }
}

export const getStatusForCurrentUser = (activeRound: roundState, user: IUser) => {
    if(!activeRound.round_data) {
        if(user.id === activeRound?.riddler?.id) {
            return 'We are waiting for your word'
        } else {
            return 'We are waiting for your opponent\'s word'
        }
    }

    let myTurn = isMyTurn(activeRound, user);

    if(myTurn) {
        if(user.id === activeRound.riddler?.id) {
            return 'Answer the question or reject the guess'
        } else {
            return 'Ask a question or make a guess'
        }
    } 

    return 'waiting for your opponent\'s move'
}

export const getGuesser = (members: IMember[], me: IUser, riddler: IUser) => {
    const isMe = me.id !== riddler.id
    if(isMe) {
        return 'YOU'
    } else {
        const member = members.find(m => m.user.id !== riddler.id)!
        return member.user.fullName
    }
}

export const disableNotMyTurn = (activeRound: roundState, user: IUser) => {
    const amIneedRiddle = findRiddlerWord(activeRound, user)
    if(amIneedRiddle) {
        return false
    } else if (activeRound.round_data && isMyTurn(activeRound, user)) {
        return false
    }
    return true
}