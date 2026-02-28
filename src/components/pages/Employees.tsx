"use client";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { FilterButton } from "../custom/FilterButton";
import { SearchInput } from "../custom/SearchInput";
import Status from "../StatusBadge";
import { TableCell } from "../ui/table";
import AddButton from "../AddButton";
import HighlightCell from "../HighlightCell";
import { useGetEmployees, useDeleteEmployee, useGetEmployeeRoles } from "@/hooks/useEmployees";
import { Employee } from "@/types";
import TableSkeleton from "../skeletons/TableSkeleton";
import ResponseError from "../ResponseError";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { useTranslations } from "next-intl";

const Employees = ({ onGoToRoles }: { onGoToRoles?: () => void }) => {
  const t = useTranslations("translation")
  const [page, setPage] = useState(1);
  const [showRolesDialog, setShowRolesDialog] = useState(false);

  const { data, isLoading, error } = useGetEmployees();
  const { data: rolesData, isLoading: rolesLoading } = useGetEmployeeRoles();

  const { employees = [], limit, total } = data?.data || {};
  const roles = rolesData?.data?.employeeRoles || [];
  const hasNoRoles = !rolesLoading && roles.length === 0;

  const { mutateAsync: deleteEmployee, isPending: deleteLoading } = useDeleteEmployee();

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

  const cols = ["name", "email", "phone", "status", "actions"];

  const row = (employee: Employee) => (
    <>
      <HighlightCell text={employee.name} query={search} />
      <HighlightCell text={employee.email} query={search} />
      <TableCell>{employee.phone}</TableCell>
      <TableCell>
        <Status value={employee.status} />
      </TableCell>
      <TableCell className="flex gap-4">
        <div
          onClickCapture={(e) => {
            if (hasNoRoles) {
              e.stopPropagation();
              e.preventDefault();
              setShowRolesDialog(true);
            }
          }}
        >
          <TableActions
            id={employee._id}
            baseRoute="/employee-management"
            actions={["edit", "delete"]}
            module="Employee"
            onDelete={(id, closeDialog) =>
              deleteEmployee(id, {
                onSuccess: () => closeDialog(),
              })
            }
            deleteLoading={deleteLoading}
          />
        </div>
      </TableCell>
    </>
  );

  const statusOptions = [
    { label: "all", value: "all" },
    { label: "active", value: "active" },
    { label: "inactive", value: "inactive" },
    { label: "blocked", value: "blocked" },
  ];

  if (isLoading) return <TableSkeleton cols={cols.length} rows={10} />;
  if (error) return <ResponseError error={error.message} />;

  const pagination = { page, limit, total, setPage };

  return (
    <div>
      <AlertDialog open={showRolesDialog} onOpenChange={setShowRolesDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("noEmployeeRolesFound")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("noEmployeeRolesDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onGoToRoles}>
              {t("addRoles")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <SearchInput
            placeholder="searchEmployee"
            onChange={(e) => setSearch(e)}
            debounceDelay={500}
          />
          <FilterButton
            label="status"
            value={selectedStatus}
            onChange={(val) => setSelectedStatus(val as string)}
            options={statusOptions}
          />
        </div>
        <div
          onClickCapture={(e) => {
            if (hasNoRoles) {
              e.stopPropagation();
              e.preventDefault();
              setShowRolesDialog(true);
            }
          }}
        >
          <AddButton addBtnTitle="employee" />
        </div>
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