// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "./slices/appDataSlice";
import zonesReducer from "./slices/zonesSlice";
import categoryReducer from "./slices/categorySlice";
import fieldReducer from "./slices/fieldSlice";
import formReducer from "./slices/formSlice";
import rentalRequestsReducer from "./slices/rentalListSlice";
import ticketReducer from "./slices/ticketSlice";
import refundRequestsReducer from "./slices/refundSlice";
import staffReducer from "./slices/staffSlice";
import faqReducer from "./slices/faqSlice";
import queryReducer from "./slices/querySlice";
import chatsReducer from "./slices/chatsSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
  reducer: {
    appData: appDataReducer,
    zones: zonesReducer,
    categories: categoryReducer,
    fields: fieldReducer,
    forms: formReducer,
    rentalRequests: rentalRequestsReducer,
    tickets: ticketReducer,
    refundRequests: refundRequestsReducer,
    staff: staffReducer,
    faqs: faqReducer,
    queries: queryReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
