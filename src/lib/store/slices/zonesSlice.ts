// zoneSlice.ts
import { Zone } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Zone[] = [
  {
    _id: "1",
    name: "Gulf Zone",
    country: "United Arab Emirates",
    currency: "AED",
    timeZone: "Asia/Dubai",
    language: "Arabic",
    radius: 50,
    latlong: [25.276987, 55.296249],
    thumbnail: "https://cdn.example.com/zone/gulf.jpg",
    status: "active",
    adminNotes: "High traffic zone with premium listings",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "New York Metro",
    country: "USA",
    currency: "USD",
    timeZone: "America/New_York",
    language: "English",
    radius: 30,
    latlong: [40.712776, -74.005974],
    thumbnail: "https://cdn.example.com/zone/nyc.jpg",
    status: "active",
    adminNotes: "Targeting business services",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    name: "London Central",
    country: "UK",
    currency: "GBP",
    timeZone: "Europe/London",
    language: "English",
    radius: 25,
    latlong: [51.507351, -0.127758],
    thumbnail: "https://cdn.example.com/zone/london.jpg",
    status: "active",
    adminNotes: "Important for local events",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    name: "Berlin Tech Hub",
    country: "Germany",
    currency: "EUR",
    timeZone: "Europe/Berlin",
    language: "German",
    radius: 20,
    latlong: [52.52, 13.405],
    thumbnail: "https://cdn.example.com/zone/berlin.jpg",
    status: "inactive",
    adminNotes: "Paused due to restructuring",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5",
    name: "Karachi South",
    country: "Pakistan",
    currency: "PKR",
    timeZone: "Asia/Karachi",
    language: "Urdu",
    radius: 15,
    latlong: [24.8607, 67.0011],
    thumbnail: "https://cdn.example.com/zone/karachi.jpg",
    status: "active",
    adminNotes: "High delivery density zone",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "6",
    name: "Tokyo Bay Area",
    country: "Japan",
    currency: "JPY",
    timeZone: "Asia/Tokyo",
    language: "Japanese",
    radius: 35,
    latlong: [35.6895, 139.6917],
    thumbnail: "https://cdn.example.com/zone/tokyo.jpg",
    status: "active",
    adminNotes: "Focused on tech & electronics",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "7",
    name: "Toronto Core",
    country: "Canada",
    currency: "CAD",
    timeZone: "America/Toronto",
    language: "English",
    radius: 22,
    latlong: [43.65107, -79.347015],
    thumbnail: "https://cdn.example.com/zone/toronto.jpg",
    status: "active",
    adminNotes: "English/French service duality",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "8",
    name: "Melbourne Central",
    country: "Australia",
    currency: "AUD",
    timeZone: "Australia/Melbourne",
    language: "English",
    radius: 18,
    latlong: [-37.8136, 144.9631],
    thumbnail: "https://cdn.example.com/zone/melbourne.jpg",
    status: "active",
    adminNotes: "Expanding suburbs coverage",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
