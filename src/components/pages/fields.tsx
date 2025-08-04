"use client";
import { TableCell } from "@/components/ui/table";
import { useAppSelector } from "@/lib/store/hooks";
import TableActions from "../actions";
import { DataTable } from "../custom/data-table";
export default function Fields() {
  const fields = useAppSelector((s: any) => s.fields) || [];

  const cols = ["Name", "Type", "Label", "Actions"];
  const row = (field: any) => (
    <>
      <TableCell>{field.name}</TableCell>
      <TableCell className="capitalize">{field.type}</TableCell>
      <TableCell>{field.label ?? "—"}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={field._id}
          baseRoute="/field-management"
          module="Field"
          actions={["view", "edit", "delete"]}
          onDelete={(id) => console.log("deleted:", id)}
          deleteLoading={false}
        />
      </TableCell>
    </>
  );

  return <DataTable data={fields} cols={cols} row={row} />;
}
