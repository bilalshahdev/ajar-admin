// data.ts

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

import { User } from "@/types";

export const users: User[] = [
  {
    _id: 1,
    userId: "Mehek Nanwani",
    phone: "+1 93072059670",
    email: "macster@prettysky.link",
    joinedDate: new Date("2024-01-02T00:00:00Z"),

    status: "active",
  },
  {
    _id: 2,
    userId: "Rahil Shaik",
    phone: "+1 56272059670",
    email: "Rahil@dinlaan.com",
    joinedDate: new Date("2024-01-03T00:00:00Z"),

    status: "blocked",
  },
  {
    _id: 3,
    userId: "Mustat Ansari",
    phone: "+1 82522059670",
    email: "Mustatr@gmailbrt.com",
    joinedDate: new Date("2024-07-05T00:00:00Z"),

    status: "active",
  },
  {
    _id: 4,
    userId: "Rehana Naik",
    phone: "+1 56272059541",
    email: "Rehana@racfq.com",
    joinedDate: new Date("2024-03-24T00:00:00Z"),

    status: "active",
  },
  {
    _id: 5,
    userId: "Priya Patel",
    phone: "+1 8054059670",
    email: "macster@boxgu.com",
    joinedDate: new Date("2024-04-15T00:00:00Z"),

    status: "blocked",
  },
  {
    _id: 6,
    userId: "Jiya Goyal",
    phone: "+1 56513230156",
    email: "macster@khothiai.com",
    joinedDate: new Date("2024-04-18T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: 7,
    userId: "Nitya Sariwal",
    phone: "+1 70247952231",
    email: "Nitya@hulas.co",
    joinedDate: new Date("2024-04-02T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: 8,
    userId: "Prajay Naik",
    phone: "+1 8014874263",
    email: "Prajay@hulas.co",
    joinedDate: new Date("2024-01-15T00:00:00Z"),

    status: "pending",
  },
  {
    _id: 9,
    userId: "Mohan Pai",
    phone: "+1 56272059670",
    email: "Mohan@racfq.com",
    joinedDate: new Date("2024-02-13T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: 10,
    userId: "Brijesh Korgaokar",
    phone: "+1 56272059670",
    email: "Brijesh@dinlaan.com",
    joinedDate: new Date("2024-03-19T00:00:00Z"),

    status: "inactive",
  },
  {
    _id: 11,
    userId: "Nityanand Prabhu",
    phone: "+1 56272059670",
    email: "Nityanand@gmail.com",
    joinedDate: new Date("2024-04-30T00:00:00Z"),

    status: "inactive",
  },
];
