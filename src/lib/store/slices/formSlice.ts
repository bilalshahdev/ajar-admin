import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Form {
  _id: string;
  categoryId: string;
  name: string;
  description?: string;
  fields: string[]; // field IDs
}

const initialState: Form[] = [
  {
    _id: "frm-201",
    categoryId: "101",        // Electronics
    name: "Electronics Listing",
    description: "Fields required for electronics products",
    fields: ["fld-101", "fld-102", "fld-105"], // full_name, email, bio
  },
  {
    _id: "frm-202",
    categoryId: "105",        // Food Delivery
    name: "Restaurant Signup",
    fields: ["fld-101", "fld-104"], // full_name, skills
  },
];

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateFormFields: (
      state,
      action: PayloadAction<{ categoryId: string; fields: string[] }>
    ) => {
      const idx = state.findIndex((f) => f.categoryId === action.payload.categoryId);
      if (idx !== -1) state[idx].fields = action.payload.fields;
    },
    updateFormMeta: (state, action: PayloadAction<Form>) => {
      const idx = state.findIndex((f) => f._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { updateFormFields, updateFormMeta } = formsSlice.actions;
export default formsSlice.reducer;
