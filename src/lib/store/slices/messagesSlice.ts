// messages slice
import { createSlice } from "@reduxjs/toolkit";
import { messages } from "@/config/data";

const initialState = {
  messages: messages,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },
    updateMessage: (state, action) => {
      state.messages = state.messages.map((message) => {
        if (message._id === action.payload._id) {
          return action.payload;
        }
        return message;
      });
    },
  },
});

export const { addMessage, removeMessage, updateMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
