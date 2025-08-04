"use client";

import { TableCell } from "@/components/ui/table";
import { limit } from "@/config/constants";
import { useDeleteCategory, useGetCategories } from "@/hooks/useCategories";
import { Category } from "@/types";
import { useState } from "react";
import TableActions from "../actions";
import { DataTable } from "../custom/data-table";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import Tooltip from "../tooltip";

const Categories = () => {
  const [page, setPage] = useState(1);
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategories({ page, limit });
  const { mutate: deleteCategory, isPending: deleteLoading } =
    useDeleteCategory();

  const cols = ["Name", "Type", "Parent", "Actions"];
  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={12} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const row = (category: Category) => (
    <>
      {category?.description?.trim() ? (
        <Tooltip content={category?.description || ""}>
          <TableCell>{category.name}</TableCell>
        </Tooltip>
      ) : (
        <TableCell>{category.name}</TableCell>
      )}
      <TableCell className="capitalize">{category.type}</TableCell>
      <TableCell>{category?.category?.name || "—"}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={category._id}
          baseRoute="/category-management"
          actions={["edit", "delete"]}
          module="Category"
          onDelete={(id, closeDialog) =>
            deleteCategory(id, {
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
        data={categories?.data?.categories || []}
        cols={cols}
        row={row}
        pagination={{
          total: categories?.data?.total || 0,
          page: categories?.data?.page || 1,
          limit: categories?.data?.limit || 10,
          setPage,
        }}
      />
    </div>
  );
};

export default Categories;
