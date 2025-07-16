"use client";

import { TableCell } from "@/components/ui/table";
import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import { useAppSelector } from "@/lib/store/hooks";
import { Category, Zone } from "@/types";
import ConfirmDialog from "./confirm-dialog";
import { DataTable } from "./custom/data-table";
import Tooltip from "./tooltip";

const Categories = () => {
  const categories: Category[] =
    useAppSelector((state: any) => state.categories) || [];

  const zones: Zone[] = useAppSelector((state: any) => state.zones) || [];

  const getZoneName = (id: string) =>
    zones.find((z) => z._id === id)?.name || "—";

  const cols = ["Name", "Type", "Parent", "Zone", "Status", "Actions"];
  const row = (category: Category) => (
    <>
      <TableCell>{category.name}</TableCell>
      <TableCell className="capitalize">{category.type}</TableCell>
      <TableCell>
        {category.type === "subCategory"
          ? categories.find((c) => c._id === category.categoryId)?.name || "N/A"
          : "—"}
      </TableCell>
      <TableCell>{getZoneName(category.zoneId)}</TableCell>
      <TableCell className="capitalize">{category.status}</TableCell>
      <TableCell className="flex gap-4">
        <Link href={`/category-management/${category._id}/edit`}>
          <Tooltip content="Edit Category">
            <FiEdit2 size={18} className="cursor-pointer text-blue-500" />
          </Tooltip>
        </Link>

        <ConfirmDialog
          title="Delete Category"
          description="Are you sure you want to delete this category?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            console.log("deleted:", category);
            // dispatch(removeCategory(cat._id)) — integrate when ready
          }}
          loading={false}
          variant="destructive"
        >
          <Tooltip content="Delete Category">
            <FiTrash2 size={18} className="cursor-pointer text-red-500" />
          </Tooltip>
        </ConfirmDialog>
      </TableCell>
    </>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <DataTable data={categories} cols={cols} row={row} />
    </div>
  );
};

export default Categories;
