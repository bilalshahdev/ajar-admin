"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import ConfirmDialog from "@/components/confirm-dialog";
import { useAppSelector } from "@/lib/store/hooks";
export default function Fields() {
  const fields = useAppSelector((s: any) => s.fields) || [];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field: any) => (
          <TableRow key={field._id}>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
