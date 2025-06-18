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

import { useAppSelector } from "@/lib/store/hooks";
import ConfirmDialog from "./confirm-dialog";
import { Category, Zone } from "@/types";

const Categories = () => {
  const categories: Category[] =
    useAppSelector((state: any) => state.categories) || [];

  const zones: Zone[] = useAppSelector((state: any) => state.zones) || [];

  const getZoneName = (id: string) =>
    zones.find((z) => z._id === id)?.name || "—";

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{getZoneName(cat.zoneId)}</TableCell>
              <TableCell className="capitalize">{cat.status}</TableCell>

              <TableCell className="flex gap-4">
                {/* View */}
                {/* <Link href={`/category-management/${cat._id}`}>
                  <FiEye size={18} className="cursor-pointer text-blue-500" />
                </Link> */}

                {/* Edit */}
                <Link href={`/category-management/${cat._id}/edit`}>
                  <FiEdit2 size={18} className="cursor-pointer text-blue-500" />
                </Link>

                {/* Delete */}
                <ConfirmDialog
                  title="Delete Category"
                  description="Are you sure you want to delete this category?"
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => {
                    console.log("deleted:", cat);
                    // dispatch(removeCategory(cat._id)) — integrate when ready
                  }}
                  loading={false}
                  variant="destructive"
                >
                  <FiTrash2 size={18} className="cursor-pointer text-red-500" />
                </ConfirmDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Categories;
