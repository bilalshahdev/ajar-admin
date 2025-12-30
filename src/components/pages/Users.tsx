"use client";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { statusColors } from "@/config/data";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUserStatus,
} from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { User, UserStatus } from "@/types";
import { useState } from "react";
import { IoDocuments } from "react-icons/io5";
import TableActions from "../Actions";
import StatsCard from "../cards/StatsCard";
import { DataTable } from "../custom/DataTable";
import ResponseError from "../ResponseError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UserDetailsLazy from "../UserDetails";
import Tooltip from "../Tooltip";

const userStatus = ["active", "inactive", "blocked", "unblocked"];

const Users = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUsers({ page, limit: 10 });
  const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUser();
  const { mutate: updateUserStatus, isPending: updateLoading } =
    useUpdateUserStatus();

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;

  const { users, stats, pagination } = data?.data || {};
  const { total, page: currentPage, limit } = pagination || {};

  const handleUpdateUserStatus = (id: string, status: UserStatus) => {
    updateUserStatus({ id, status });
  };

  const {
    totalActiveUsers,
    totalBlockedUsers,
    totalInactiveUsers,
    totalUsers,
  } = stats || {};

  const UserStats = [
    {
      title: "Total Users",
      value: totalUsers?.toString() || "0",
      change: {
        value: 0,
        trend: "up",
      },
    },
    {
      title: "Active Users",
      value: totalActiveUsers?.toString() || "0",
      change: {
        value: 0,
        trend: "up",
      },
    },
    {
      title: "Inactive Users",
      value: totalInactiveUsers?.toString() || "0",
      change: {
        value: 0,
        trend: "up",
      },
    },
    {
      title: "Blocked Users",
      value: totalBlockedUsers?.toString() || "0",
      change: {
        value: 0,
        trend: "up",
      },
    },
  ];

  const cols = [
    "User No",
    "Name",
    "Phone",
    "Email",
    "Status",
    "Documents",
    "Actions",
  ];

  const row = (user: User) => (
    <>
      <TableCell>{user._id.slice(0, 4)}</TableCell>
      <TableCell>{user.name || "—"}</TableCell>
      <TableCell>{user.phone || "—"}</TableCell>
      <TableCell>{user.email || "—"}</TableCell>
      <TableCell>
        <Select
          defaultValue={user.status}
          onValueChange={(value) =>
            handleUpdateUserStatus(user._id, value as UserStatus)
          }
          disabled={updateLoading}
        >
          <SelectTrigger className="capitalize w-[160px]">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  statusColors[user.status as UserStatus] || "bg-gray-300"
                )}
              />
              <SelectValue placeholder="Select status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {userStatus.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            <Tooltip content="View Documents">
              <IoDocuments size={18} className="text-blue-500 cursor-pointer" />
            </Tooltip>
          </DialogTrigger>
          <DialogContent className="max-h-[600px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>Documents</DialogTitle>
            </DialogHeader>
            <UserDetailsLazy userId={user._id} />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={user._id}
          baseRoute="/users"
          module="User"
          actions={["delete"]}
          onDelete={(id, close) => {
            deleteUser(id);
            close();
          }}
        />
      </TableCell>
    </>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UserStats.map((data: any) => (
          <StatsCard
            key={data.title}
            label={data.title}
            value={data.value}
            change={data.change}
          />
        ))}
      </div>
      <DataTable
        data={users || []}
        cols={cols}
        row={row}
        pagination={{
          total: total || 0,
          page: currentPage || 1,
          limit: limit || 10,
          setPage,
        }}
      />
    </div>
  );
};

export default Users;

const UserDetails = ({ User }: { User: User }) => {
  return (
    <>
      <div>{User.name}</div>
      <div>{User.email}</div>
      <div>{User.phone}</div>
      <div>{User.status}</div>
    </>
  );
};
