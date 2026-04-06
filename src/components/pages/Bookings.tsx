"use client";
import { useBookings, useDeleteBooking } from "@/hooks/useBookings";
import { useGetZones } from "@/hooks/useZones";
import { useGetSubCategoriesList } from "@/hooks/useCategories";
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
import DateRangePicker from "@/components/DateRangePicker";

const Bookings = () => {
  const t = useTranslations("translation");
  const [page, setPage] = useState(1);
  const [zone, setZone] = useState<string | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined);
  const [checkIn, setCheckIn] = useState<string | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<string | undefined>(undefined);

  const { data: zonesData } = useGetZones({ page: 1, limit: 100 });
  const zones = zonesData?.data?.zones || [];

  const { data: subCategoriesData } = useGetSubCategoriesList();
  const subCategories = subCategoriesData?.data || [];

  const {
    data: bookings,
    isLoading,
    isFetching,
    error,
  } = useBookings({
    page,
    limit: 10,
    zone,
    subCategory,
    checkIn,
    checkOut,
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

  if (isLoading || isFetching) return <TableSkeleton cols={cols.length} rows={10} />;
  if (error) return <ResponseError error={error.message} />;

  const row = (booking: Booking) => (
    <>
      <TableCell>{booking._id.slice(-4)}</TableCell>
      <HighlightCell text={booking.leaser?.name} query={search} />
      <TableCell>{new Date(booking.dates.checkIn).toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{new Date(booking.dates.checkOut).toLocaleDateString("en-GB")}</TableCell>
      <TableCell>${booking.priceDetails.totalPrice.toFixed(2)}</TableCell>
      <TableCell>
        <span
          className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${booking.status === "approved"
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
              onSuccess: () => closeDialog(),
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
    setPage,
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="flex flex-wrap items-center justify-end gap-4">

        {/* Zone filter */}
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
              <SelectItem key={z._id} value={z._id}>{z.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SubCategory filter */}
        <Select
          value={subCategory ?? "all"}
          onValueChange={(value) => {
            setPage(1);
            setSubCategory(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Subcategories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subcategories</SelectItem>
            {subCategories.map((s: { _id: string; name: string }) => (
              <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* CheckIn / CheckOut date range filter */}
        <DateRangePicker
          fromDate={checkIn}
          toDate={checkOut}
          onFromChange={(val) => { setPage(1); setCheckIn(val); }}
          onToChange={(val) => { setPage(1); setCheckOut(val); }}
          fromLabel="Check In"
          toLabel="Check Out"
          placeholder="Check In → Check Out"
        />

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