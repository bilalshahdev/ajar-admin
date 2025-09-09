// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "./slices/appDataSlice";
import fieldReducer from "./slices/fieldSlice";
import chatsReducer from "./slices/chatsSlice";

const store = configureStore({
  reducer: {
    appData: appDataReducer,
    fields: fieldReducer,
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
