"use client";
import UsersList from "@/components/dashboard/users-list";
import StatsCard from "../cards/stats-card";
import { users } from "@/config/data";

const UserStats = [
  {
    title: "Total Users",
    value: users.length.toString(),
    change: 0,
  },
  {
    title: "Active Users",
    value: users.filter((user) => user.status === "active").length.toString(),
    change: 0,
  },
  {
    title: "Inactive Users",
    value: users.filter((user) => user.status === "inactive").length.toString(),
    change: 0,
  },
  {
    title: "Blocked Users",
    value: users.filter((user) => user.status === "blocked").length.toString(),
    change: 0,
  },
];
const Users = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {UserStats.map((data) => (
          <StatsCard key={data.title} {...data} />
        ))}
      </div>
      <UsersList users={users} />
    </div>
  );
};

export default Users;
