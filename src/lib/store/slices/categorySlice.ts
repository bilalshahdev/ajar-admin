// categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";

const initialState: Category[] = [];

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      return state.filter((cat: Category) => cat._id !== action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const idx = state.findIndex(
        (cat: Category) => cat._id === action.payload._id
      );
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
