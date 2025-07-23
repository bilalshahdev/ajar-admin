// chats slice
import { createSlice } from "@reduxjs/toolkit";
import { chats } from "@/config/data";

const initialState = {
  chats: chats,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    removeChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
    },
    updateChat: (state, action) => {
      state.chats = state.chats.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
    },
  },
});

export const { addChat, removeChat, updateChat } = chatsSlice.actions;
export default chatsSlice.reducer;