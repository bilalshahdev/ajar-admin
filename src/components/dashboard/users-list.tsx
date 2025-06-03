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

const UsersList = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.userId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>List of users</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Table className="w-full bg-background rounded-lg">
        <TableHeader>
          <TableRow className="">
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
          {filteredUsers.map((user, index) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
