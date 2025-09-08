"use client";
import {
  useDeleteEmployeeRole,
  useGetEmployeeRoles,
} from "@/hooks/useEmployees";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import AddButton from "../AddButton";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import HighlightCell from "../HighlightCell";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import { TableCell } from "../ui/table";
import EmployeeRoleForm from "../forms/EmployeeRoleForm";

const EmployeeRoles = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetEmployeeRoles();
  const { employeeRoles = [], limit, total } = data?.data || {};

  const { mutateAsync: deleteEmployeeRole, isPending: deleteLoading } =
    useDeleteEmployeeRole();

  const [search, setSearch] = useState("");

  const filteredEmployeeRoles = useMemo(() => {
    return filterData({
      data: employeeRoles,
      search,
      searchKeys: ["name"],
    });
  }, [employeeRoles, search]);

  const cols = ["ID", "Role name", "Permissions", "Actions"];
  const row = (employeeRole: any) => {
    return (
      <>
        <TableCell>{employeeRole._id.slice(-4)}</TableCell>
        <HighlightCell text={employeeRole.name} query={search} />
        <TableCell>
          {employeeRole.permissions?.length || 0} Permissions
        </TableCell>
        <TableCell className="flex gap-4">
          <TableActions
            id={employeeRole._id}
            baseRoute="/employee-management"
            actions={["edit", "delete"]}
            module="Employee Role"
            onDelete={(id, closeDialog) =>
              deleteEmployeeRole(id, {
                onSuccess: () => {
                  closeDialog();
                },
              })
            }
            editDialog={{
              title: "Edit Employee Role",
              content: <EmployeeRoleForm id={employeeRole._id} />,
              modal: false,
            }}
            deleteLoading={deleteLoading}
          />
        </TableCell>
      </>
    );
  };

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
            placeholder="Search employee role"
            onChange={(e) => setSearch(e)}
            debounceDelay={500}
          />
        </div>
        <AddButton
          addBtnTitle="Role-permission"
          isDialog
          dialogContent={<EmployeeRoleForm />}
          modal={false}
        />
      </div>
      <DataTable
        cols={cols}
        data={filteredEmployeeRoles}
        row={row}
        pagination={pagination}
      />
    </div>
  );
};

export default EmployeeRoles;
