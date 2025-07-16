import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RentalRequest } from "@/types";

const initialState: RentalRequest[] = [
  {
    _id: "1",
    name: "Wireless Headphones",
    description:
      "High-quality over-ear wireless headphones with noise cancellation.",
    price: 199.99,
    images: Array(5).fill("/images/dummy/items.avif"),
    date: "2025-07-15T10:30:00Z",
    status: "pending",
    subcategory: {
      name: "Audio Devices",
      category: {
        name: "Electronics",
      },
    },
    leaser: {
      _id: "leaser_001",
      name: "Ali Raza",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_101",
      name: "Hamza Tariq",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "2",
    name: "Running Shoes",
    description:
      "Lightweight and breathable running shoes designed for comfort and speed.",
    price: 89.99,
    images: Array(6).fill("/images/dummy/items.avif"),
    date: "2025-07-14T09:20:00Z",
    status: "approved",
    subcategory: {
      name: "Men's Footwear",
      category: {
        name: "Fashion",
      },
    },
    leaser: {
      _id: "leaser_002",
      name: "Sara Ahmed",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_102",
      name: "Zain Ul Abideen",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "3",
    name: "Gaming Keyboard",
    description:
      "Mechanical RGB keyboard with customizable keys and fast response time.",
    price: 59.99,
    images: Array(4).fill("/images/dummy/items.avif"),
    date: "2025-07-13T17:45:00Z",
    status: "completed",
    subcategory: {
      name: "Computer Accessories",
      category: {
        name: "Electronics",
      },
    },
    leaser: {
      _id: "leaser_003",
      name: "Bilal Shah",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_103",
      name: "Rida Khan",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "4",
    name: "Leather Backpack",
    description:
      "Durable leather backpack suitable for travel and everyday use.",
    price: 129.49,
    images: Array(7).fill("/images/dummy/items.avif"),
    date: "2025-07-11T12:10:00Z",
    status: "rejected",
    subcategory: {
      name: "Bags",
      category: {
        name: "Accessories",
      },
    },
    leaser: {
      _id: "leaser_004",
      name: "Mehwish Fatima",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_104",
      name: "Junaid Arif",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "5",
    name: "Coffee Maker",
    description:
      "Automatic coffee machine with programmable settings and sleek design.",
    price: 74.99,
    images: Array(6).fill("/images/dummy/items.avif"),
    date: "2025-07-10T15:00:00Z",
    status: "pending",
    subcategory: {
      name: "Kitchen Appliances",
      category: {
        name: "Home & Living",
      },
    },
    leaser: {
      _id: "leaser_005",
      name: "Omar Khalid",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_105",
      name: "Amna Yousaf",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "6",
    name: "Mountain Bicycle",
    description:
      "Sturdy mountain bike with 21-speed gear system and shock absorbers.",
    price: 349.0,
    images: Array(8).fill("/images/dummy/items.avif"),
    date: "2025-07-09T08:40:00Z",
    status: "approved",
    subcategory: {
      name: "Outdoor Sports",
      category: {
        name: "Sports & Fitness",
      },
    },
    leaser: {
      _id: "leaser_006",
      name: "Fatima Noor",
      profilePic: "/images/dummy/leaser.avif",
    },
    renter: {
      _id: "renter_106",
      name: "Yasir Mehmood",
      profilePic: "/images/dummy/renter.avif",
    },
  },
];

export const rentalListSlice = createSlice({
  name: "rentalList",
  initialState,
  reducers: {
    updateRentalStatus: (
      state,
      action: PayloadAction<{ _id: string; status: RentalRequest["status"] }>
    ) => {
      const idx = state.findIndex((r) => r._id === action.payload._id);
      if (idx !== -1) state[idx].status = action.payload.status;
    },
    updateRentalMeta: (state, action: PayloadAction<RentalRequest>) => {
      const idx = state.findIndex((r) => r._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { updateRentalStatus, updateRentalMeta } = rentalListSlice.actions;
export default rentalListSlice.reducer;
