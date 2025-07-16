import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "@/types";

const initialState: Ticket[] = [
  {
    _id: "6493",
    sender: "Mehek Nanwani",
    email: "macster@ky.link",
    subject: "Sed ut perspiciatis unde omnis iste natus",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
    createdAt: "2025-04-07",
    status: "pending",
    group: "Advertisement",
    assignedTo: "David Smith",
    priority: "Medium",
    response: "First response 10:30am, 25 April 2025",
    complainant: {
      name: "Taylor Swift",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "2024",
    sender: "Rahil Shaik",
    email: "+91 56272059670",
    subject: "Lorem lipsum ipsum",
    description: "Subject details and issue reported...",
    createdAt: "2025-01-03",
    status: "active",
    group: "Sales",
    assignedTo: "Anum Khan",
    priority: "Low",
    complainant: {
      name: "Rahil Shaik",
      profilePic: "/images/dummy/leaser.avif",
    },
  },
  {
    _id: "1022",
    sender: "Mustat Ansari",
    email: "+91 82522059670",
    subject: "Lorem lipsum ipsum",
    description: "Issue with payment verification.",
    createdAt: "2025-07-05",
    status: "rejected",
    group: "Billing",
    assignedTo: "Sana Tariq",
    priority: "High",
    response: "Responded: 8:45am, 10 July 2025",
    complainant: {
      name: "Mustat Ansari",
      profilePic: "/images/dummy/renter.avif",
    },
  },
  {
    _id: "3414",
    sender: "Rehana Naik",
    email: "+91 56272059541",
    subject: "Lorem lipsum ipsum",
    createdAt: "2025-03-24",
    status: "pending",
    priority: "Medium",
    complainant: {
      name: "Rehana Naik",
      profilePic: "/images/dummy/leaser.avif",
    },
  },
  {
    _id: "5112",
    sender: "Priya Patel",
    email: "+91 8054059670",
    subject: "Lorem lipsum ipsum",
    createdAt: "2025-04-15",
    status: "active",
    group: "Support",
    assignedTo: "David Smith",
    priority: "Low",
    complainant: {
      name: "Priya Patel",
      profilePic: "/images/dummy/leaser.avif",
    },
  },
  {
    _id: "6223",
    sender: "Jiya Goyal",
    email: "+91 56512320156",
    subject: "Lorem lipsum ipsum",
    createdAt: "2025-04-18",
    status: "active",
    complainant: {
      name: "Jiya Goyal",
      profilePic: "/images/dummy/renter.avif",
    },
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
