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

const initialState: Field[] = [
  {
    _id: "fld-101",
    name: "full_name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter full name",
    order: 1,
    visible: true,
    readonly: false,
    isMultiple: false,
    validation: { required: true },
  },
  {
    _id: "fld-102",
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter email",
    order: 2,
    visible: true,
    validation: {
      required: true,
      pattern: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    },
  },
  {
    _id: "fld-103",
    name: "dob",
    label: "Date of Birth",
    type: "date",
    order: 3,
    visible: true,
    validation: { required: true },
  },
  {
    _id: "fld-104",
    name: "skills",
    label: "Skills",
    type: "multiselect",
    isMultiple: true,
    options: ["HTML", "CSS", "JS", "React", "Node"],
    placeholder: "Select skills",
    order: 4,
    tooltip: "You can select multiple",
    validation: { required: false },
  },
  {
    _id: "fld-105",
    name: "bio",
    label: "Bio",
    type: "text",
    placeholder: "Short introduction",
    order: 5,
    visible: true,
    validation: { required: false, min: 10, max: 250 },
  },
];

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
