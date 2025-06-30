// categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";

const initialState: Category[] = [
  {
    _id: "101",
    type: "category",
    name: "Electronics",
    slug: "electronics",
    thumbnail: "https://cdn.example.com/cat/electronics.jpg",
    zoneId: "1", // Gulf Zone
    status: "active",
    description: "All kinds of electronic items",
    icon: "tv",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "102",
    type: "category",
    name: "Real Estate",
    slug: "real-estate",
    thumbnail: "https://cdn.example.com/cat/realestate.jpg",
    zoneId: "2", // New York Metro
    status: "active",
    icon: "building",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "1101",
    type: "subCategory",
    name: "Apartments",
    slug: "apartments",
    categoryId: "102", // parent: Real Estate
    thumbnail: "https://cdn.example.com/cat/apartments.jpg",
    zoneId: "2",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "103",
    type: "category",
    name: "Events & Entertainment",
    slug: "events-entertainment",
    thumbnail: "https://cdn.example.com/cat/events.jpg",
    zoneId: "3", // London Central
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "104",
    type: "category",
    name: "Tech Start-ups",
    slug: "tech-startups",
    thumbnail: "https://cdn.example.com/cat/startups.jpg",
    zoneId: "4", // Berlin Tech Hub
    status: "inactive",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "105",
    type: "category",
    name: "Food Delivery",
    slug: "food-delivery",
    thumbnail: "https://cdn.example.com/cat/food.jpg",
    zoneId: "5", // Karachi South
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "106",
    type: "category",
    name: "Gaming & Anime",
    slug: "gaming-anime",
    thumbnail: "https://cdn.example.com/cat/gaming.jpg",
    zoneId: "6", // Tokyo Bay Area
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "107",
    type: "category",
    name: "Professional Services",
    slug: "professional-services",
    thumbnail: "https://cdn.example.com/cat/services.jpg",
    zoneId: "7", // Toronto Core
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "108",
    type: "category",
    name: "Travel & Tourism",
    slug: "travel-tourism",
    thumbnail: "https://cdn.example.com/cat/travel.jpg",
    zoneId: "8", // Melbourne Central
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "109",
    type: "category",
    name: "Healthcare",
    slug: "healthcare",
    zoneId: "2",
    status: "inactive",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "110",
    type: "category",
    name: "Education",
    slug: "education",
    zoneId: "3",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


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
      const idx = state.findIndex((cat: Category) => cat._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
