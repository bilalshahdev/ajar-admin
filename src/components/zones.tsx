"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Zone } from "@/types";
import { FiEdit2, FiEye, FiSettings, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import ConfirmDialog from "./confirm-dialog";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ZoneForm from "./forms/zone-form";
const Zones = () => {
  const zones = useSelector((state: any) => state.zones);
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Radius</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones?.map((zone: Zone) => (
            <TableRow key={zone._id}>
              <TableCell>{zone.name}</TableCell>
              <TableCell>{zone.country}</TableCell>
              <TableCell>{zone.radius}</TableCell>
              <TableCell className="flex gap-4">
                {/* View Zone */}
                {/* <Link href={`/zone-management/${zone._id}`}>
                  <FiEye size={18} className="cursor-pointer text-blue-500" />
                </Link> */}
                {/*  Zone Settings */}
                <Link href={`/zone-management/${zone._id}/settings`}>
                  <FiSettings
                    size={18}
                    className="cursor-pointer text-blue-500"
                  />
                </Link>
                {/* <Link href={`/zone-management/${zone._id}/edit`}> */}
                <Dialog>
                  <DialogTrigger>
                    <FiEdit2
                      size={18}
                      className="cursor-pointer text-blue-500"
                    />
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Zones;
