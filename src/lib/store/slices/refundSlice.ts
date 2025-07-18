import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefundRequest, RefundStatus } from "@/types";

const initialState: RefundRequest[] = [
  {
    _id: "20",
    listing: "3BR villa",
    user: "Fahad Malik",
    dateSubmitted: "2025-07-30",
    amount: 200,
    status: "pending",
  },
  {
    _id: "41",
    listing: "Camper Van",
    user: "Syed Abdul Rehman",
    dateSubmitted: "2025-05-05",
    amount: 50,
    status: "approved",
  },
  {
    _id: "45",
    listing: "Studio Apartment",
    user: "Sunil Pareem",
    dateSubmitted: "2025-09-07",
    amount: 500,
    status: "rejected",
  },
  {
    _id: "32",
    listing: "SUV",
    user: "Jasim",
    dateSubmitted: "2025-05-16",
    amount: 200,
    status: "pending",
  },
  {
    _id: "21",
    listing: "Sports Car",
    user: "Sara Salim",
    dateSubmitted: "2025-08-07",
    amount: 50,
    status: "approved",
  },
  {
    _id: "70",
    listing: "Heavy bike",
    user: "Mubarak Ali",
    dateSubmitted: "2025-03-12",
    amount: 500,
    status: "rejected",
  },
  {
    _id: "19",
    listing: "Super bike",
    user: "Karishna",
    dateSubmitted: "2025-01-12",
    amount: 200,
    status: "pending",
  },
  {
    _id: "33",
    listing: "Apartments",
    user: "Saoud Faisal",
    dateSubmitted: "2025-06-16",
    amount: 50,
    status: "approved",
  },
];

const refundSlice = createSlice({
  name: "refundRequests",
  initialState,
  reducers: {
    updateRefundStatus: (
      state,
      action: PayloadAction<{ id: string; status: RefundStatus }>
    ) => {
      const index = state.findIndex((r) => r._id === action.payload.id);
      if (index !== -1) {
        state[index].status = action.payload.status;
      }
    },
  },
});

export const { updateRefundStatus } = refundSlice.actions;
export default refundSlice.reducer;
