"use client";
import { RootState } from "@/lib/store";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { FilterButton } from "../custom/FilterButton";
import { SearchInput } from "../custom/SearchInput";
import Status from "../StatusBadge";
import { TableCell } from "../ui/table";
import AddButton from "../AddButton";

const Employees = () => {
  const employees = useSelector((state: RootState) => state.staff);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredEmployees = useMemo(() => {
    return filterData({
      data: employees,
      search,
      searchKeys: ["name", "email", "role", "status"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [employees, search, selectedStatus]);

  const cols = ["Name", "Email", "Role", "Status", "Created At", "Actions"];
  const row = (employee: any) => {
    return (
      <>
        <TableCell>{employee.name}</TableCell>
        <TableCell>{employee.email}</TableCell>
        <TableCell>{employee.role}</TableCell>
        <TableCell>
          <Status value={employee.status} />
        </TableCell>
        <TableCell>
          {new Date(employee.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell className="flex gap-4">
          <TableActions
            id={employee._id}
            baseRoute="/employee-management"
            actions={["view", "edit", "delete"]}
            module="Employee"
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <SearchInput
            placeholder="Search employee"
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
        <AddButton addBtnTitle="Employee" />
      </div>
      <DataTable cols={cols} data={filteredEmployees} row={row} />
    </div>
  );
};

export default Employees;
