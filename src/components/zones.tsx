"use client";
import { TableCell } from "@/components/ui/table";
import { Zone } from "@/types";
import { useSelector } from "react-redux";
import TableActions from "./actions";
import { DataTable } from "./custom/data-table";
import ZoneForm from "./forms/zone-form";
const Zones = () => {
  const zones = useSelector((state: any) => state.zones);
  const cols = ["Name", "Country", "Radius", "Actions"];
  const row = (zone: Zone) => (
    <>
      <TableCell>{zone.name}</TableCell>
      <TableCell>{zone.country}</TableCell>
      <TableCell>{zone.radius}</TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={zone._id}
          baseRoute="/zone-management"
          module="Zone"
          actions={["settings", "edit", "delete"]}
          onDelete={(id) => console.log("deleted:", id)}
          deleteLoading={false}
          editDialog={{
            title: "Edit Zone",
            description: "Edit the zone details below.",
            content: <ZoneForm id={zone._id} />,
          }}
        />
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
