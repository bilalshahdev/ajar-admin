// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "@/types";

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.unshift(action.payload); // add new chat on top
    },
    updateChat: (
      state,
      action: PayloadAction<{ chatId: string; lastMessage: Message }>
    ) => {
      const idx = state.chats.findIndex((c) => c._id === action.payload.chatId);
      if (idx !== -1) {
        const chat = state.chats[idx];
        chat.lastMessage = action.payload.lastMessage;

        // move chat to top
        state.chats.splice(idx, 1);
        state.chats.unshift(chat);
      }
    },

    removeChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((c) => c._id !== action.payload);
    },
  },
});

export const {
  setChats,
  setLoading,
  setError,
  addChat,
  updateChat,
  removeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
