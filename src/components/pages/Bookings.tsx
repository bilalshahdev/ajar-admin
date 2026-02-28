"use client";
import { useBookings, useDeleteBooking } from "@/hooks/useBookings";
import { useGetZones } from "@/hooks/useZones";
import { Booking } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import HighlightCell from "../HighlightCell";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import { TableCell } from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";

const Bookings = () => {
  const t = useTranslations("translation");
  const [page, setPage] = useState(1);
  const [zone, setZone] = useState<string | undefined>(undefined);

  const { data: zonesData } = useGetZones({ page: 1, limit: 100 });
  const zones = zonesData?.data?.zones || [];

  const {
    data: bookings,
    isLoading,
    error,
  } = useBookings({
    page,
    limit: 10,
    zone,
  });
  const { mutate: deleteBooking, isPending: deleteLoading } = useDeleteBooking();

  const [search, setSearch] = useState("");
  const filteredBookings = useMemo(() => {
    const bookingList = bookings?.data?.bookings || [];
    return filterData({
      data: bookingList,
      search,
      searchKeys: ["leaser.name", "status"],
    });
  }, [bookings, search]);

  const cols = [
    "id",
    "leaser",
    "checkIn",
    "checkOut",
    "totalPrice",
    "status",
    "duration",
    "unit",
    "actions",
  ];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const row = (booking: Booking) => (
    <>
      <TableCell>{booking._id.slice(-4)}</TableCell>
      <HighlightCell text={booking.leaser?.name} query={search} />
      <TableCell>{new Date(booking.dates.checkIn).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(booking.dates.checkOut).toLocaleDateString()}</TableCell>
      <TableCell>${booking.priceDetails.totalPrice.toFixed(2)}</TableCell>
      <TableCell>
        <span
          className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
            booking.status === "approved"
              ? "bg-green-100 text-green-700"
              : booking.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : booking.status === "in_progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {booking.status.replace("_", " ")}
        </span>
      </TableCell>
      <TableCell>{booking.pricingMeta.duration}</TableCell>
      <TableCell className="capitalize">{booking.pricingMeta.unit}</TableCell>
      <TableCell>
        <TableActions
          id={booking._id}
          baseRoute="/bookings"
          actions={["view", "delete"]}
          module="Booking"
          onDelete={(id, closeDialog) =>
            deleteBooking(id, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
          deleteLoading={deleteLoading}
        />
      </TableCell>
    </>
  );

  const pagination = {
    total: bookings?.data?.total || 0,
    page: bookings?.data?.page || 1,
    limit: bookings?.data?.limit || 10,
    setPage: setPage,
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="flex items-center justify-end gap-4">
        <Select
          value={zone ?? "all"}
          onValueChange={(value) => {
            setPage(1);
            setZone(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("selectZone")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allZones")}</SelectItem>
            {zones.map((z: { _id: string; name: string }) => (
              <SelectItem key={z._id} value={z._id}>
                {z.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SearchInput
          className="w-full"
          onChange={(e) => setSearch(e)}
          placeholder="searchBookings"
        />
      </div>
      <DataTable
        cols={cols}
        data={filteredBookings as Booking[]}
        row={row}
        pagination={pagination}
      />
    </div>
  );
};

export default Bookings;