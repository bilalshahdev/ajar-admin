"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { TableCell } from "../ui/table";
import { DataTable } from "../custom/DataTable";
import Status from "../StatusBadge";
import { useMemo, useState } from "react";
import { filterData } from "@/utils/filterData";
import { SearchInput } from "../custom/SearchInput";
import { Label } from "../Typography";
import { FilterButton } from "../custom/FilterButton";
import Link from "next/link";
import ConfirmDialog from "../ConfirmDialog";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import Tooltip from "../Tooltip";
import TableActions from "../Actions";

const StaffManagement = () => {
  const staff = useSelector((state: RootState) => state.staff);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredStaff = useMemo(() => {
    return filterData({
      data: staff,
      search,
      searchKeys: ["name", "email", "role", "status"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [staff, search, selectedStatus]);

  const cols = ["Name", "Email", "Role", "Status", "Created At", "Actions"];
  const row = (staff: any) => {
    return (
      <>
        <TableCell>{staff.name}</TableCell>
        <TableCell>{staff.email}</TableCell>
        <TableCell>{staff.role}</TableCell>
        <TableCell>
          <Status value={staff.status} />
        </TableCell>
        <TableCell>{new Date(staff.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className="flex gap-4">
          <TableActions
            id={staff._id}
            baseRoute="/staff-management"
            actions={["view", "edit", "delete"]}
            module="Staff"
            onDelete={(id) => console.log("deleted:", id)}
            deleteLoading={false}
          />
        </TableCell>
      </>
    );
  };

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
  ];

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
          <SearchInput
            placeholder="Search staff"
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
      <DataTable cols={cols} data={filteredStaff} row={row} />
    </div>
  );
};

export default StaffManagement;
