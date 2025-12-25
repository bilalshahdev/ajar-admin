import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Field {
  _id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  order: number;
  tooltip?: string;
  defaultValue?: string | number | boolean;
  visible?: boolean;
  readonly?: boolean;
  isMultiple?: boolean;
  options?: string[];
  validation?: {
    required: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

const initialState: Field[] = [];

export const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<Field>) => {
      state.push(action.payload);
    },
    updateField: (state, action: PayloadAction<Field>) => {
      const index = state.findIndex((f) => f._id === action.payload._id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteField: (state, action: PayloadAction<string>) => {
      return state.filter((f) => f._id !== action.payload);
    },
  },
});

export const { addField, updateField, deleteField } = fieldSlice.actions;
export default fieldSlice.reducer;
