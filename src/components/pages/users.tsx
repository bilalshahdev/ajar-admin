"use client";
import Loader from "@/components/Loader";
import { TableCell } from "@/components/ui/table";
import { useDeleteUser, useGetUsers } from "@/hooks/useUsers";
import { User } from "@/services/users";
import { useState } from "react";
import ResponseError from "../ResponseError";
import TableActions from "../Actions";
import StatsCard from "../cards/StatsCard";
import { DataTable } from "../custom/DataTable";

const Users = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUsers({ page, limit: 10 });
  const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUser();

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;

  const { users, stats, pagination } = data?.data || {};
  const { total, page: currentPage, limit } = pagination || {};

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
      change: 0,
    },
    {
      title: "Active Users",
      value: totalActiveUsers?.toString() || "0",
      change: 0,
    },
    {
      title: "Inactive Users",
      value: totalInactiveUsers?.toString() || "0",
      change: 0,
    },
    {
      title: "Blocked Users",
      value: totalBlockedUsers?.toString() || "0",
      change: 0,
    },
  ];

  const cols = ["User No", "Name", "Phone", "Email", "Status", "Actions"];

  const row = (user: User) => (
    <>
      <TableCell>{user._id.slice(0, 4)}</TableCell>
      <TableCell>{user.name || "—"}</TableCell>
      <TableCell>{user.phone || "—"}</TableCell>
      <TableCell>{user.email || "—"}</TableCell>
      <TableCell className="capitalize">{user.status || "—"}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={user._id}
          baseRoute="/users-verification"
          actions={["delete"]}
          module="User"
          onDelete={(id: string, closeDialog: () => void) =>
            deleteUser(id, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
          deleteLoading={deleteLoading}
        />
      </TableCell>
    </>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UserStats.map((data) => (
          <StatsCard key={data.title} {...data} />
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
