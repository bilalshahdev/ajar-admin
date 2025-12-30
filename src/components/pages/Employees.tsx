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
import HighlightCell from "../HighlightCell";
import { useGetEmployees, useDeleteEmployee } from "@/hooks/useEmployees";
import { Employee } from "@/types";
import TableSkeleton from "../skeletons/TableSkeleton";
import ResponseError from "../ResponseError";

const Employees = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetEmployees();
  const { employees = [], limit, total } = data?.data || {};

  const {
    mutateAsync: deleteEmployee,
    isPending: deleteLoading,
    error: deleteError,
  } = useDeleteEmployee();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredEmployees = useMemo(() => {
    return filterData({
      data: employees,
      search,
      searchKeys: ["name", "email", "phone"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [employees, search, selectedStatus]);

  const cols = ["Name", "Email", "Phone", "Status", "Actions"];
  const row = (employee: Employee) => {
    return (
      <>
        <HighlightCell text={employee.name} query={search} />
        <HighlightCell text={employee.email} query={search} />
        <TableCell>{employee.phone}</TableCell>
        <TableCell>
          <Status value={employee.status} />
        </TableCell>
        <TableCell className="flex gap-4">
          <TableActions
            id={employee._id}
            baseRoute="/employee-management"
            actions={["edit", "delete"]}
            module="Employee"
            onDelete={(id, closeDialog) =>
              deleteEmployee(id, {
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
  };

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
  ];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const pagination = {
    page,
    limit,
    total,
    setPage,
  };

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
      <DataTable
        cols={cols}
        data={filteredEmployees}
        row={row}
        pagination={pagination}
      />
    </div>
  );
};

export default Employees;
