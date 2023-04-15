import { IMember } from "@/models/IChat";
import { IRound } from "@/models/IGame";
import { IUser } from "@/models/IUser";
import { roundState } from "@/store/slices/roundSlice";

const isMyTurn = (activeRound: roundState, user: IUser): boolean => {
  let isMyTurn;
  if (activeRound.moves?.length) {
    isMyTurn =
      activeRound.moves[activeRound.moves?.length - 1].player.id !== user.id;
  } else {
    isMyTurn = activeRound?.riddler?.id !== user.id;
  }
  return isMyTurn;
};

const findRiddlerWord = (activeRound: roundState, user: IUser) => {
  if (!activeRound.round_data) {
    if (user.id === activeRound?.riddler?.id) {
      return true;
    } else {
      return false;
    }
  }
};

export const getStatusForCurrentUser = (
  activeRound: roundState,
  user: IUser,
  gameType: string
) => {
  if (gameType === "words") {
    const lastMove = activeRound?.moves[activeRound.moves.length - 1];
    if (lastMove) {
      return lastMove.player.id === user.id
        ? "We are waiting for your opponent's word"
        : "We are waiting for your word";
    } else {
      return activeRound?.riddler?.id === user.id
        ? "We are waiting for your opponent's word"
        : "We are waiting for your word";
    }
  }

  if (!activeRound.round_data) {
    if (user.id === activeRound?.riddler?.id) {
      return gameType === "guess a word"
        ? "We are waiting for your word"
        : "We are waiting for your statement";
    } else {
      return gameType === "guess a word"
        ? "We are waiting for your opponent's word"
        : "We are waiting for your opponent's statement";
    }
  }

  let myTurn = isMyTurn(activeRound, user);

  if (myTurn) {
    if (user.id === activeRound.riddler?.id) {
      return "Answer the question or reject the guess";
    } else {
      return gameType === "guess a word"
        ? "Ask a question or make a guess"
        : "Make your choice";
    }
  }

  return "waiting for your opponent's move";
};

export const getGuesser = (members: IMember[], me: IUser, riddler: IUser) => {
  const isMe = me.id !== riddler.id;
  if (isMe) {
    return "YOU";
  } else {
    const member = members.find((m) => m.user.id !== riddler.id)!;
    return member.user.fullName;
  }
};

export const disableNotMyTurn = (activeRound: roundState, user: IUser) => {
  const amIneedRiddle = findRiddlerWord(activeRound, user);
  if (amIneedRiddle) {
    return false;
  } else if (activeRound.round_data && isMyTurn(activeRound, user)) {
    return false;
  }
  return true;
};

export const doesExistsInRounds = (
  activeId: number | null,
  rounds: IRound[]
) => {
  return rounds.map((r) => r.id).includes(activeId || 0);
};

export const getRoundWinnerMessage = (
  round: IRound,
  members: IMember[],
  gameType: string
) => {
  if (round.round_winner === round.riddler.id) {
    const loser = members.find(
      (m: any) => m.user.id !== round.round_winner
    )?.user;
    if (gameType === "guess a word") {
      return `${loser?.fullName} has spent all attempts, winner: ${round.riddler.fullName}`;
    } else {
      return `${loser?.fullName} didn't guess, winner: ${round.riddler.fullName}`;
    }
  } else {
    const winner = members.find(
      (m: any) => m.user.id === round.round_winner
    )?.user;
    return `${winner?.fullName} has guessed`;
  }
};
