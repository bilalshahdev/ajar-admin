import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "@/types";

const initialState: Ticket[] = [
  {
    _id: "6895cc16f0905fc775192d4f",
    booking: {
      dates: {
        checkIn: "2025-08-01T00:00:00.000Z",
        checkOut: "2025-08-05T00:00:00.000Z",
      },
      priceDetails: {
        price: 200,
        adminFee: 20,
        totalPrice: 220,
      },
      extensionCharges: {
        adminFee: 10,
        additionalCharges: 30,
        totalPrice: 40,
      },
      actualReturnedAt: null,
      _id: "687754928eee696d72b6f3b3",
      status: "pending",
      renter: "68761d81f8f63b30bbb5f6c2",
      marketplaceListingId: "687741f20011cd1f2851bdd7",
      noOfGuests: 2,
      roomType: "Deluxe Suite",
      phone: "03001234567",
      language: "en",
      languages: [
        {
          locale: "fr",
          translations: {
            roomType: "Suite de luxe",
            bookingNote: "Merci pour votre réservation",
          },
          _id: "687754928eee696d72b6f3b4",
        },
        {
          locale: "ur",
          translations: {
            roomType: "عمدہ کمرہ",
            bookingNote: "آپ کی بکنگ کا شکریہ",
          },
          _id: "687754928eee696d72b6f3b5",
        },
      ],
      otp: "",
      createdAt: "2025-07-16T07:28:18.466Z",
      updatedAt: "2025-07-16T07:28:18.466Z",
    },
    rentalText: "Scratch on door",
    issueType: "Exterior Damage",
    additionalFees: 1212,
    attachments: [],
    user: {
      _id: "64f2d3e9b2f8a1c3456d7890",
      name: "Bilal Hassan",
      email: "bilal.hassan@example.com",
      phone: "+923001234567",
      role: "user",
      dob: "1997-07-15",
      nationality: "Pakistani",
      profilePicture: "https://example.com/images/profile/bilal.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
      otp: {
        isVerified: false,
        code: "123456",
        expiry: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 mins from now
      },
      stripe: {
        connectedAccountId: "acct_1ExampleId23",
        connectedAccountLink:
          "https://dashboard.stripe.com/connect/accounts/acct_1ExampleId23",
        customerId: "cus_1ExampleCustomerId45",
      },
    },
    status: "pending",
    createdAt: "2025-08-08T10:06:14.946Z",
    updatedAt: "2025-08-08T10:06:14.946Z",
  },
];

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    updateTicketStatus: (
      state,
      action: PayloadAction<{ _id: string; status: Ticket["status"] }>
    ) => {
      const idx = state.findIndex((t) => t._id === action.payload._id);
      if (idx !== -1) {
        state[idx].status = action.payload.status;
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      return state.filter((ticket) => ticket._id !== action.payload);
    },
  },
});

export const { updateTicketStatus, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
