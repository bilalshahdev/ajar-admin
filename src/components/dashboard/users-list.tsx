"use client";

import { User } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Label } from "../typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusOptions = ["all", "active", "inactive", "blocked", "pending"];

const UsersList = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.userId
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "blocked"
        ? user.isBlocked
        : user.status === selectedStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label>List of users</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedStatus === "all"
                  ? "Filter: All"
                  : `Filter: ${
                      selectedStatus.charAt(0).toUpperCase() +
                      selectedStatus.slice(1)
                    }`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table className="w-full bg-background rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>User No</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Emails</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Block User</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.joinedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Switch checked={user.isBlocked} disabled />
                </TableCell>
                <TableCell className="text-center">
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
