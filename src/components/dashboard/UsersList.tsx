"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell } from "@/components/ui/table";
import { User } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import { DataTable } from "../custom/DataTable";
import { FilterButton } from "../custom/FilterButton";
import { SearchInput } from "../custom/SearchInput";
import { Label, Small, XS } from "../Typography";
import Status from "../StatusBadge";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Blocked", value: "blocked" },
];

const UsersList = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    return filterData({
      data: users,
      search,
      searchKeys: ["name", "email", "phone"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [users, search, selectedStatus]);

  const cols = ["User No", "Name", "Phone", "Emails", "Status", "Actions"];

  const row = (user: User, index: number) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer">{user.name}</p>
          </DialogTrigger>
          <DialogContent className="w-sm text-center">
            <DialogHeader>
              <DialogTitle>User Identity Verification</DialogTitle>
            </DialogHeader>
            <UserInfo name={user.name} email={user.email} phone={user.phone} />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Status value={user.status || ""} />
      </TableCell>
      <TableCell>
        <div className="">...</div>
      </TableCell>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label>List of users</Label>
        <div className="flex gap-2">
          <SearchInput
            placeholder="Search User"
            onChange={(e) => setSearch(e)}
            debounceDelay={500}
          />

          <FilterButton
            label="Status"
            value={selectedStatus}
            onChange={(val) => setSelectedStatus(val as string)}
            options={statusOptions}
          />
        </div>
      </div>
      <DataTable data={filteredUsers} cols={cols} row={row} />
    </div>
  );
};

export default UsersList;

const UserInfo = ({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted-foreground">
            {/* <MyImage
                              src={user.profileImage}
                              alt="User"
                              width={50}
                              height={50}
                            /> */}
          </div>
          <div className="flex flex-col items-start">
            <Small className="font-semibold">{name}</Small>
            <XS>{email}</XS>
            <XS>{phone}</XS>
          </div>
        </div>
        <div className="w-60 h-32 rounded bg-muted-foreground mb-2"></div>
        <div>
          <XS className="flex items-center space-x-2 text-green-600">
            <span>✅</span>
            <span>Document is not expired</span>
          </XS>
          <XS className="flex items-center space-x-2 text-green-600">
            <span>✅</span>
            <span>Date of birth matches</span>
          </XS>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="default">Approve</Button>
        <Button variant="destructive">Reject</Button>
      </div>
    </div>
  );
};
