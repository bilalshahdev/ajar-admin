// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "./slices/appDataSlice";
import zonesReducer from "./slices/zonesSlice";
import categoryReducer from "./slices/categorySlice";
import fieldReducer from "./slices/fieldSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    appData: appDataReducer,
    zones: zonesReducer,
    categories: categoryReducer,
    fields: fieldReducer,
    forms: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
