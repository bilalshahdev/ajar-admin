// staffSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { staffData } from "@/config/data";

interface Staff {
  _id: string;
  name: string;
  email: string;
  role: string;
  access: { module: string; permissions: string[] }[];
  image: string;
  status: string;
  createdAt: Date;
}
const initialState: Staff[] = staffData;

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
});

export const {} = staffSlice.actions;
export default staffSlice.reducer;
