import UsersList from "@/components/dashboard/users-list";
import { Label, Small, XS } from "@/components/typography";
import { User } from "@/types";

const UserVerificationPage = () => {
  const users: User[] = [
    {
      _id: 1,
      userId: "Mehek Nanwani",
      phone: "+1 93072059670",
      email: "macster@prettysky.link",
      joinedDate: new Date("2024-01-02T00:00:00Z"),
      isBlocked: true,
      status: "active",
    },
    {
      _id: 2,
      userId: "Rahil Shaik",
      phone: "+1 56272059670",
      email: "Rahil@dinlaan.com",
      joinedDate: new Date("2024-01-03T00:00:00Z"),
      isBlocked: false,
      status: "active",
    },
    {
      _id: 3,
      userId: "Mustat Ansari",
      phone: "+1 82522059670",
      email: "Mustatr@gmailbrt.com",
      joinedDate: new Date("2024-07-05T00:00:00Z"),
      isBlocked: false,
      status: "active",
    },
    {
      _id: 4,
      userId: "Rehana Naik",
      phone: "+1 56272059541",
      email: "Rehana@racfq.com",
      joinedDate: new Date("2024-03-24T00:00:00Z"),
      isBlocked: false,
      status: "active",
    },
    {
      _id: 5,
      userId: "Priya Patel",
      phone: "+1 8054059670",
      email: "macster@boxgu.com",
      joinedDate: new Date("2024-04-15T00:00:00Z"),
      isBlocked: false,
      status: "active",
    },
    {
      _id: 6,
      userId: "Jiya Goyal",
      phone: "+1 56513230156",
      email: "macster@khothiai.com",
      joinedDate: new Date("2024-04-18T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
    {
      _id: 7,
      userId: "Nitya Sariwal",
      phone: "+1 70247952231",
      email: "Nitya@hulas.co",
      joinedDate: new Date("2024-04-02T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
    {
      _id: 8,
      userId: "Prajay Naik",
      phone: "+1 8014874263",
      email: "Prajay@hulas.co",
      joinedDate: new Date("2024-01-15T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
    {
      _id: 9,
      userId: "Mohan Pai",
      phone: "+1 56272059670",
      email: "Mohan@racfq.com",
      joinedDate: new Date("2024-02-13T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
    {
      _id: 10,
      userId: "Brijesh Korgaokar",
      phone: "+1 56272059670",
      email: "Brijesh@dinlaan.com",
      joinedDate: new Date("2024-03-19T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
    {
      _id: 11,
      userId: "Nityanand Prabhu",
      phone: "+1 56272059670",
      email: "Nityanand@gmail.com",
      joinedDate: new Date("2024-04-30T00:00:00Z"),
      isBlocked: false,
      status: "inactive",
    },
  ];

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
      value: users
        .filter((user) => user.status === "inactive")
        .length.toString(),
      change: 0,
    },
    {
      title: "Blocked Users",
      value: users.filter((user) => user.isBlocked).length.toString(),
      change: 0,
    },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {UserStats.map((data) => (
          <UserStatsCard key={data.title} {...data} />
        ))}
      </div>

      <UsersList users={users} />
    </div>
  );
};

export default UserVerificationPage;

const UserStatsCard = (data: {
  title: string;
  value: string;
  change: number;
}) => {
  return (
    <div className="p-4 rounded-lg bg-background shadow">
      <XS>{data.title}</XS>
      <div className="flex justify-between items-end">
        <p className="text-lg font-bold">{data.value}</p>
        <p className="text-sm">{data.change}</p>
      </div>
    </div>
  );
};
