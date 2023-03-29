import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {userReducer} from "@/store/slices/userSlice";
import {api} from "@/services/api";
import {chatReducer} from "@/store/slices/chatSlice";
import {roundReducer} from "@/store/slices/roundSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            chat: chatReducer,
            round: roundReducer,
            [api.reducerPath]: api.reducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<RootStore>(makeStore, {
    debug: false,
});
