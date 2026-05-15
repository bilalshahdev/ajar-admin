"use client";
import {
  useDeleteRentalListing,
  useRentalListings,
} from "@/hooks/useRentalListings";
import { useGetZones } from "@/hooks/useZones";
import { RentalListing } from "@/types";
import { useState } from "react";
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
import { useDebounce } from "@/hooks/use-debounce";

const RentalListings = () => {
  const t = useTranslations("translation");
  const [page, setPage] = useState(1);
  const [zone, setZone] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: zonesData } = useGetZones({ page: 1, limit: 10 });
  const zones = zonesData?.data?.zones || [];

  const {
    data: rentalRequests,
    isLoading,
    isFetching,
    error,
  } = useRentalListings({
    page,
    limit: 10,
    zone,
    search: debouncedSearch,
  });

  const { mutate: deleteRentalListing, isPending: deleteLoading } = useDeleteRentalListing();

  const rentalListings = rentalRequests?.data?.listings || [];

  const cols = ["id", "productName", "subCategory", "owner", "createdAt", "actions"];

  if (error) return <ResponseError error={error.message} />;

  const row = (rentalRequest: RentalListing) => (
  <>
    <TableCell>{rentalRequest._id.slice(-4)}</TableCell>
    <HighlightCell text={rentalRequest.name} query={debouncedSearch} className="truncate w-28"/>
    <HighlightCell text={rentalRequest?.subCategory?.name} query={debouncedSearch}/>
    <HighlightCell text={rentalRequest?.leaser?.name} query={debouncedSearch}/>
    <TableCell>{new Date(rentalRequest.createdAt).toLocaleDateString("en-GB")}</TableCell>
    <TableCell>
      <TableActions
        id={rentalRequest._id}
        baseRoute="/rental-listing"
        actions={["view", "delete"]}
        module="Listing"
        onDelete={(id, closeDialog) =>
          deleteRentalListing(id, {onSuccess: () => closeDialog()})
        }
        deleteLoading={deleteLoading}
      />
    </TableCell>
  </>
);

  const pagination = {
    total: rentalRequests?.data?.total || 0,
    page: rentalRequests?.data?.page || 1,
    limit: rentalRequests?.data?.limit || 10,
    setPage,
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
          onChange={(e) => {
            setSearch(e);
          }}
          placeholder="searchRentalRequest"
        />
      </div>

      {isLoading || isFetching ? (
        <TableSkeleton cols={cols.length} rows={10} />
      ) : (
        <DataTable
          cols={cols}
          data={rentalListings as RentalListing[]}
          row={row}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default RentalListings;