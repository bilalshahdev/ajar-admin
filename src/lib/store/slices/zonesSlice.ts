// zoneSlice.ts
import { Zone } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Zone[] =  []

const zoneSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    addZone: (state, action) => {
      state.push(action.payload);
    },
    removeZone: (state, action) => {
      state = state.filter((zone) => zone._id !== action.payload._id);
    },
    updateZone: (state, action) => {
      const index = state.findIndex((zone) => zone._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export default zoneSlice.reducer;
