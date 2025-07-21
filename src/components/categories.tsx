"use client";

import { TableCell } from "@/components/ui/table";

import { useAppSelector } from "@/lib/store/hooks";
import { Category, Zone } from "@/types";
import TableActions from "./actions";
import { DataTable } from "./custom/data-table";

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
        <TableActions
          id={category._id}
          baseRoute="/category-management"
          actions={["edit", "delete"]}
          module="Category"
          onDelete={(id) => console.log("deleted:", id)}
          deleteLoading={false}
        />
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
