// data.ts

import { Faq, Query, User } from "@/types";

export type FilterOption = "7 days" | "4 weeks" | "12 months";

export const chartFilters: FilterOption[] = ["7 days", "4 weeks", "12 months"];

export const userChartData: Record<
  FilterOption,
  { month: string; users: number }[]
> = {
  "7 days": [
    { month: "Mon", users: 23 },
    { month: "Tue", users: 45 },
    { month: "Wed", users: 31 },
    { month: "Thu", users: 60 },
    { month: "Fri", users: 78 },
    { month: "Sat", users: 55 },
    { month: "Sun", users: 88 },
  ],
  "4 weeks": [
    { month: "Week 1", users: 220 },
    { month: "Week 2", users: 340 },
    { month: "Week 3", users: 190 },
    { month: "Week 4", users: 410 },
  ],
  "12 months": [
    { month: "Jan", users: 320 },
    { month: "Feb", users: 280 },
    { month: "Mar", users: 450 },
    { month: "Apr", users: 310 },
    { month: "May", users: 500 },
    { month: "Jun", users: 380 },
    { month: "Jul", users: 440 },
    { month: "Aug", users: 520 },
    { month: "Sep", users: 490 },
    { month: "Oct", users: 470 },
    { month: "Nov", users: 560 },
    { month: "Dec", users: 610 },
  ],
};

export const earningChartData: Record<
  FilterOption,
  { month: string; earnings: number }[]
> = {
  "7 days": [
    { month: "Mon", earnings: 120 },
    { month: "Tue", earnings: 180 },
    { month: "Wed", earnings: 150 },
    { month: "Thu", earnings: 210 },
    { month: "Fri", earnings: 300 },
    { month: "Sat", earnings: 280 },
    { month: "Sun", earnings: 350 },
  ],
  "4 weeks": [
    { month: "Week 1", earnings: 1000 },
    { month: "Week 2", earnings: 1250 },
    { month: "Week 3", earnings: 1100 },
    { month: "Week 4", earnings: 1350 },
  ],
  "12 months": [
    { month: "Jan", earnings: 3200 },
    { month: "Feb", earnings: 2800 },
    { month: "Mar", earnings: 3600 },
    { month: "Apr", earnings: 3900 },
    { month: "May", earnings: 4500 },
    { month: "Jun", earnings: 4200 },
    { month: "Jul", earnings: 4800 },
    { month: "Aug", earnings: 5000 },
    { month: "Sep", earnings: 4700 },
    { month: "Oct", earnings: 4600 },
    { month: "Nov", earnings: 5200 },
    { month: "Dec", earnings: 5500 },
  ],
};

export const users: User[] = [
  {
    _id: "1",
    name: "Mehek Nanwani",
    phone: "+1 93072059670",
    email: "macster@prettysky.link",
    joinedDate: new Date("2024-01-02T00:00:00Z"),

    status: "active",
  },
  {
    _id: "2",
    name: "Rahil Shaik",
    phone: "+1 56272059670",
    email: "Rahil@dinlaan.com",
    joinedDate: new Date("2024-01-03T00:00:00Z"),

    status: "blocked",
  },
  {
    _id: "3",
    name: "Mustat Ansari",
    phone: "+1 82522059670",
    email: "Mustatr@gmailbrt.com",
    joinedDate: new Date("2024-07-05T00:00:00Z"),

    status: "active",
  },
  {
    _id: "4",
    name: "Rehana Naik",
    phone: "+1 56272059541",
    email: "Rehana@racfq.com",
    joinedDate: new Date("2024-03-24T00:00:00Z"),

    status: "active",
  },
  {
    _id: "5",
    name: "Priya Patel",
    phone: "+1 8054059670",
    email: "macster@boxgu.com",
    joinedDate: new Date("2024-04-15T00:00:00Z"),

    status: "blocked",
  },
  {
    _id: "6",
    name: "Jiya Goyal",
    phone: "+1 56513230156",
    email: "macster@khothiai.com",
    joinedDate: new Date("2024-04-18T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: "7",
    name: "Nitya Sariwal",
    phone: "+1 70247952231",
    email: "Nitya@hulas.co",
    joinedDate: new Date("2024-04-02T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: "8",
    name: "Prajay Naik",
    phone: "+1 8014874263",
    email: "Prajay@hulas.co",
    joinedDate: new Date("2024-01-15T00:00:00Z"),

    status: "pending",
  },
  {
    _id: "9",
    name: "Mohan Pai",
    phone: "+1 56272059670",
    email: "Mohan@racfq.com",
    joinedDate: new Date("2024-02-13T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: "10",
    name: "Brijesh Korgaokar",
    phone: "+1 56272059670",
    email: "Brijesh@dinlaan.com",
    joinedDate: new Date("2024-03-19T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: "11",
    name: "Nityanand Prabhu",
    phone: "+1 56272059670",
    email: "Nityanand@gmail.com",
    joinedDate: new Date("2024-04-30T00:00:00Z"),

    status: "inactive",
  },
];

export const staffData = [
  {
    _id: "64e4c0f1f5f3a1b1f0a12301",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    role: "zone-manager",
    access: [
      { module: "zones", permissions: ["read", "write"] },
      { module: "dashboard", permissions: ["read"] },
    ],
    image: "https://example.com/images/ayesha.jpg",
    status: "active",
    createdAt: new Date("2024-06-15T09:30:00Z"),
  },
  {
    _id: "64e4c0f1f5f3a1b1f0a12302",
    name: "Bilal Ahmed",
    email: "bilal.ahmed@example.com",
    role: "category-manager",
    access: [
      { module: "categories", permissions: ["read", "write", "delete"] },
      { module: "reports", permissions: ["read"] },
    ],
    image: "https://example.com/images/bilal.jpg",
    status: "active",
    createdAt: new Date("2024-06-20T12:00:00Z"),
  },
  {
    _id: "64e4c0f1f5f3a1b1f0a12303",
    name: "Sarah Malik",
    email: "sarah.malik@example.com",
    role: "form-manager",
    access: [
      { module: "forms", permissions: ["read", "write"] },
      { module: "responses", permissions: ["read", "export"] },
    ],
    image: "https://example.com/images/sarah.jpg",
    status: "blocked",
    createdAt: new Date("2024-07-01T08:45:00Z"),
  },
  {
    _id: "64e4c0f1f5f3a1b1f0a12304",
    name: "Usman Tariq",
    email: "usman.tariq@example.com",
    role: "zone-manager",
    access: [
      { module: "zones", permissions: ["read"] },
      { module: "alerts", permissions: ["read", "resolve"] },
    ],
    image: "https://example.com/images/usman.jpg",
    status: "active",
    createdAt: new Date("2024-05-30T14:10:00Z"),
  },
  {
    _id: "64e4c0f1f5f3a1b1f0a12305",
    name: "Hina Raza",
    email: "hina.raza@example.com",
    role: "form-manager",
    access: [
      { module: "forms", permissions: ["read", "write", "delete"] },
      { module: "categories", permissions: ["read"] },
    ],
    image: "https://example.com/images/hina.jpg",
    status: "inactive",
    createdAt: new Date("2024-06-10T11:15:00Z"),
  },
  {
    _id: "64e4c0f1f5f3a1b1f0a12306",
    name: "Imran Baig",
    email: "imran.baig@example.com",
    role: "category-manager",
    access: [
      { module: "categories", permissions: ["read", "write"] },
      { module: "zones", permissions: ["read"] },
    ],
    image: "https://example.com/images/imran.jpg",
    status: "blocked",
    createdAt: new Date("2024-07-12T10:00:00Z"),
  },
];

export const faqs: Faq[] = [
  {
    _id: "faq001",
    question: "What is your return policy?",
    answer:
      "We offer a 14-day return policy on all unused and unopened products with original packaging.",
    order: 1,
  },
  {
    _id: "faq002",
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3–5 business days within the country and 7–14 days for international orders.",
    order: 2,
  },
  {
    _id: "faq003",
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on orders above $50 within the country.",
    order: 3,
  },
  {
    _id: "faq004",
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking link and order details.",
    order: 4,
  },
  {
    _id: "faq005",
    question: "Can I change or cancel my order after placing it?",
    answer:
      "Orders can be changed or canceled within 2 hours of placement. Please contact support immediately.",
    order: 5,
  },
  {
    _id: "faq006",
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.",
    order: 6,
  },
  {
    _id: "faq007",
    question: "Is my personal information secure?",
    answer:
      "Yes, we use industry-standard encryption and never share your information with third parties.",
    order: 7,
  },
  {
    _id: "faq008",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 100 countries. Shipping fees and delivery times vary by destination.",
    order: 8,
  },
  {
    _id: "faq009",
    question: "How do I contact customer support?",
    answer:
      "You can contact us via our contact form or email us at support@example.com.",
    order: 9,
  },
  {
    _id: "faq010",
    question: "Do you offer bulk or wholesale discounts?",
    answer:
      "Yes, please reach out to sales@example.com for wholesale inquiries and pricing.",
    order: 10,
  },
];

export const contactData = [
  {
    _id: "1",
    phone: "9234522312",
    email: "dummy1@dcodax.com",
    address: "123 Main St, Anytown, PK",
    order: 1,
  },
  {
    _id: "2",
    phone: "9234122312",
    email: "dummy2@dcodax.com",
    address: "22 Main St, Anytown, PK",
    order: 2,
  },
  {
    _id: "3",
    phone: "9234122312",
    email: "dummy3@dcodax.com",
    address: "32 Main St, Anytown, PK",
    order: 3,
  },
  {
    _id: "4",
    phone: "9234122312",
    email: "dummy4@dcodax.com",
    address: "42 Main St, Anytown, PK",
    order: 4,
  },
  {
    _id: "5",
    phone: "9234122312",
    email: "dummy5@dcodax.com",
    address: "52 Main St, Anytown, PK",
    order: 5,
  },
];

export const queryData: Query[] = [
  {
    _id: "q1",
    sentBy: {
      _id: "u1",
      name: "Ali Raza",
      phone: "+923001234567",
      email: "ali.raza@example.com",
      joinedDate: new Date("2024-01-10"),
      status: "active",
    },
    sentTo: {
      _id: "u2",
      name: "Sara Ahmed",
      phone: "+923008765432",
      email: "sara.ahmed@example.com",
      joinedDate: new Date("2024-03-14"),
      status: "active",
    },
    title: "Login Issue",
    description: "Unable to login with correct credentials.",
    status: "pending",
    createdAt: new Date("2025-07-18T10:15:00Z"),
  },
  {
    _id: "q2",
    sentBy: {
      _id: "u3",
      name: "Bilal Khan",
      phone: "+923003334455",
      email: "bilal.khan@example.com",
      joinedDate: new Date("2023-11-02"),
      status: "active",
    },
    sentTo: {
      _id: "u4",
      name: "Ayesha Siddiqi",
      phone: "+923004446677",
      email: "ayesha.siddiqi@example.com",
      joinedDate: new Date("2024-04-20"),
      status: "inactive",
    },
    title: "Payment not processed",
    description: "Paid via Easypaisa but status is still pending.",
    status: "resolved",
    createdAt: new Date("2025-07-17T16:45:00Z"),
  },
  {
    _id: "q3",
    sentBy: {
      _id: "u5",
      name: "Zain Ali",
      phone: "+923005551234",
      email: "zain.ali@example.com",
      joinedDate: new Date("2022-06-19"),
      status: "banned",
    },
    sentTo: {
      _id: "u1",
      name: "Ali Raza",
      phone: "+923001234567",
      email: "ali.raza@example.com",
      joinedDate: new Date("2024-01-10"),
      status: "active",
    },
    title: "App Crash Report",
    description: "App crashes immediately after launching on Android 14.",
    status: "in-progress",
    createdAt: new Date("2025-07-15T08:30:00Z"),
  },
  {
    _id: "q4",
    sentBy: {
      _id: "u6",
      name: "Fatima Noor",
      phone: "+923009998877",
      email: "fatima.noor@example.com",
      joinedDate: new Date("2024-02-05"),
      status: "active",
    },
    sentTo: {
      _id: "u2",
      name: "Sara Ahmed",
      phone: "+923008765432",
      email: "sara.ahmed@example.com",
      joinedDate: new Date("2024-03-14"),
      status: "active",
    },
    title: "Feature Request",
    description: "Add biometric login for enhanced security.",
    status: "pending",
  },
  {
    _id: "q5",
    sentBy: {
      _id: "u7",
      name: "Usman Javed",
      phone: "+923007771122",
      email: "usman.javed@example.com",
      joinedDate: new Date("2023-09-01"),
      status: "inactive",
    },
    sentTo: {
      _id: "u4",
      name: "Ayesha Siddiqi",
      phone: "+923004446677",
      email: "ayesha.siddiqi@example.com",
      joinedDate: new Date("2024-04-20"),
      status: "inactive",
    },
    title: "Wrong Account Info",
    description: "My profile shows wrong email address.",
    status: "resolved",
    createdAt: new Date("2025-07-20T14:20:00Z"),
  },
];

// access: staff?.access || [
//   {
//     module: "zones",
//     permissions: ["read", "write", "update", "delete"],
//   },
//   {
//     module: "categories",
//     permissions: ["read", "write", "update", "delete"],
//   },
//   {
//     module: "forms",
//     permissions: ["read", "write"],
//   },
//   {
//     module: "refunds",
//     permissions: ["read", "update", "delete"],
//   },
//   {
//     module: "reports",
//     permissions: ["read"],
//   },
// ],
