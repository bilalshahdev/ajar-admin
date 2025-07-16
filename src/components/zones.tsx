"use client";
import { TableCell } from "@/components/ui/table";
import { Zone } from "@/types";
import Link from "next/link";
import { FiEdit2, FiSettings, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import ConfirmDialog from "./confirm-dialog";
import { DataTable } from "./custom/data-table";
import ZoneForm from "./forms/zone-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
const Zones = () => {
  const zones = useSelector((state: any) => state.zones);
  const cols = ["Name", "Country", "Radius", "Actions"];
  const row = (zone: Zone) => (
    <>
      <TableCell>{zone.name}</TableCell>
      <TableCell>{zone.country}</TableCell>
      <TableCell>{zone.radius}</TableCell>
      <TableCell className="flex gap-4">
        <Link href={`/zone-management/${zone._id}/settings`}>
          <FiSettings size={18} className="cursor-pointer text-blue-500" />
        </Link>
        <Dialog>
          <DialogTrigger>
            <FiEdit2 size={18} className="cursor-pointer text-blue-500" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Zone</DialogTitle>
              <DialogDescription>
                Edit the zone details below.
              </DialogDescription>
            </DialogHeader>
            <ZoneForm id={zone._id} />
          </DialogContent>
        </Dialog>
        {/* </Link> */}
        <ConfirmDialog
          title="Delete Zone"
          description="Are you sure you want to delete this zone?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => {
            console.log("deleted, ", zone);
          }}
          loading={false}
          variant="destructive"
        >
          <FiTrash2 size={18} className="cursor-pointer text-red-500" />
        </ConfirmDialog>
      </TableCell>
    </>
  );
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <DataTable data={zones} cols={cols} row={row} />
    </div>
  );
};

export default Zones;
