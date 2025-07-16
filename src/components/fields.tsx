"use client";
import ConfirmDialog from "@/components/confirm-dialog";
import { TableCell } from "@/components/ui/table";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { DataTable } from "./custom/data-table";
export default function Fields() {
  const fields = useAppSelector((s: any) => s.fields) || [];

  const cols = ["Name", "Type", "Label", "Actions"];
  const row = (field: any) => (
    <>
      <TableCell>{field.name}</TableCell>
      <TableCell className="capitalize">{field.type}</TableCell>
      <TableCell>{field.label ?? "—"}</TableCell>
      <TableCell className="flex gap-4">
        <Link href={`/field-management/${field._id}`}>
          <FiEye size={18} className="cursor-pointer text-blue-500" />
        </Link>
        <Link href={`/field-management/${field._id}/edit`}>
          <FiEdit2 size={18} className="text-blue-500" />
        </Link>
        <ConfirmDialog
          title="Delete Field"
          description="Are you sure you want to delete this field?"
          confirmText="Delete"
          onConfirm={() => console.log("Delete", field)}
          variant="destructive"
        >
          <FiTrash2 size={18} className="text-red-500" />
        </ConfirmDialog>
      </TableCell>
    </>
  );

  return <DataTable data={fields} cols={cols} row={row} />;
}
