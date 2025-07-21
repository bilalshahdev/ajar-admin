

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryData } from "@/config/data";
import { Query } from "@/types";

const initialState = {
  queries: queryData,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueries: (state, action: PayloadAction<Query[]>) => {
      state.queries = action.payload;
    },
    addQuery: (state, action: PayloadAction<Query>) => {
      state.queries.push(action.payload);
    },
    removeQuery: (state, action: PayloadAction<string>) => {
      state.queries = state.queries.filter((q) => q._id !== action.payload);
    },
    updateQuery: (state, action: PayloadAction<Query>) => {
      const index = state.queries.findIndex(
        (q) => q._id === action.payload._id
      );
      if (index !== -1) {
        state.queries[index] = action.payload;
      }
    },
    clearQueries: (state) => {
      state.queries = [];
    },
  },
});

export const { setQueries, addQuery, removeQuery, updateQuery, clearQueries } =
  querySlice.actions;

export default querySlice.reducer;
