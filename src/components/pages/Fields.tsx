"use client";

import { TableCell } from "@/components/ui/table";
import { limit } from "@/config/constants";
import { useDeleteField, useGetFields } from "@/hooks/useFields";
import { useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";

const Fields = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetFields({ page, limit });
  const { mutate: deleteField, isPending: deleteLoading } = useDeleteField();
  const cols = ["Label", "Name", "Type", "Actions"];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  // const row = (field: Field) => (
  const row = (field: any) => (
    <>
      <TableCell>{field.label ?? "—"}</TableCell>
      <TableCell>{field.name}</TableCell>
      <TableCell className="capitalize">{field.type}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={field._id}
          baseRoute="/field-management"
          module="Field"
          actions={["edit", "delete"]}
          onDelete={(id, closeDialog) =>
            deleteField(id, {
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
    <div className="h-full">
      <DataTable
        data={data?.data?.fields || []}
        cols={cols}
        row={row}
        pagination={{
          total: data?.data?.total || 0,
          page: data?.data?.page || 1,
          limit: data?.data?.limit || 10,
          setPage,
        }}
      />
    </div>
  );
};

export default Fields;
