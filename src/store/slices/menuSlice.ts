import { IMenuItem } from "@/models/IChat";
import { IMessage } from "@/models/IMessage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export enum menuType {
  all = "all",
  group = "group",
  direct = "direct",
  game = "game",
}

interface menuState {
  chats: IMenuItem[] | null;
  menuType: menuType;
}

const initialState: menuState = {
  chats: null,
  menuType: menuType.all,
};
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<menuType>) => {
      state.menuType = action.payload;
    },
    setMenu: (state, action: PayloadAction<IMenuItem[]>) => {
      state.chats = action.payload;
    },
    messageAdded: (
      state,
      action: PayloadAction<{ message: IMessage; chatId: number }>
    ) => {
      state.chats = state.chats || [];
      let chat = state.chats.find((chat) => chat.id === action.payload.chatId);
      if (chat) {
        chat.lastMessage = action.payload.message;
        state.chats = state.chats.filter((c) => c.id !== chat?.id);
        state.chats = [chat, ...state.chats];
      }
    },
  },
});

export const { setMenu, messageAdded, setType } = menuSlice.actions;

export const selectMenu = (state: any) => state.menu.chats;
export const selectMenuType = (state: RootState) => state.menu.menuType;

export const menuReducer = menuSlice.reducer;
