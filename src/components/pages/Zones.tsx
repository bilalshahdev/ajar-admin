"use client";
import { TableCell } from "@/components/ui/table";
import { useDeleteZone, useGetZones } from "@/hooks/useZones";
import { Zone } from "@/types";
import { slice } from "lodash";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import ZoneForm from "../forms/ZoneForm";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import { useState } from "react";
import { limit } from "@/config/constants";

const Zones = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetZones({ page, limit });
  const zones = data?.data?.zones || [];

  const { mutate: deleteZone, isPending: deleteLoading } = useDeleteZone();

  const cols = ["Id", "Name", "Currency", "Actions"];
  const row = (zone: Zone) => (
    <>
      <TableCell>{slice(zone._id, 0, 8)}</TableCell>
      <TableCell>{zone.name}</TableCell>
      <TableCell>{zone.currency}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={zone._id}
          baseRoute="/zone-management"
          module="Zone"
          actions={["settings", "edit", "delete"]}
          onDelete={(id, closeDialog) =>
            deleteZone(id, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
          deleteLoading={deleteLoading}
          editDialog={{
            title: "Edit Zone",
            description: "Edit the zone details below.",
            content: <ZoneForm id={zone._id} />,
          }}
        />
      </TableCell>
    </>
  );
  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  return (
    <div className="h-full">
      <DataTable
        data={zones}
        cols={cols}
        row={row}
        pagination={{
          total: data?.data?.total || 0,
          page: data?.data?.page || 1,
          limit: data?.data?.limit || 10,
          setPage,
        }}
      />
    </div>
  );
};

export default Zones;
