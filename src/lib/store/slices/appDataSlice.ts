// appDataSlice
import { createSlice } from "@reduxjs/toolkit";

type AppData = {
    name: string;
    country: string;
    currency: string;
    timeZone: string;
    language: string;
    radius: number;
    lat: number;
    long: number;
    thumbnail: string;
    adminNotes: string;
}
const initialState: AppData = {
  name: "",
  country: "",
  currency: "",
  timeZone: "",
  language: "",
  radius: 5,
  lat: 0,
  long: 0,
  thumbnail: "",
  adminNotes: "",
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setAppData: (state, action) => {
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.currency = action.payload.currency;
      state.timeZone = action.payload.timeZone;
      state.language = action.payload.language;
      state.radius = action.payload.radius;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
      state.thumbnail = action.payload.thumbnail;
      state.adminNotes = action.payload.adminNotes;
    },
  },
});

export const { setAppData } = appDataSlice.actions;
export default appDataSlice.reducer;

// npm for installing rtk
// npm install @reduxjs/toolkit react-redux
