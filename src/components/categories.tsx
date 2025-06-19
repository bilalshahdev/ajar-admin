"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import { useAppSelector } from "@/lib/store/hooks";
import { Category, Zone } from "@/types";
import { FaWpforms } from "react-icons/fa";
import ConfirmDialog from "./confirm-dialog";
import Tooltip from "./tooltip";

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
                <Link href={`/category-management/${cat._id}/form`}>
                  <Tooltip content="Category form">
                    <FaWpforms
                      size={18}
                      className="cursor-pointer text-blue-500"
                    />
                  </Tooltip>
                </Link>

                {/* Edit */}
                <Link href={`/category-management/${cat._id}/edit`}>
                  <Tooltip content="Edit Category">
                    <FiEdit2
                      size={18}
                      className="cursor-pointer text-blue-500"
                    />
                  </Tooltip>
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
                  <Tooltip content="Delete Category">
                    <FiTrash2
                      size={18}
                      className="cursor-pointer text-red-500"
                    />
                  </Tooltip>
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
