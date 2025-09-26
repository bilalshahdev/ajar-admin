"use client";
import {
  useDeleteRentalListing,
  useRentalListings,
} from "@/hooks/useRentalListings";
import { RentalListing } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import HighlightCell from "../HighlightCell";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import { TableCell } from "../ui/table";

const RentalListings = () => {
  const [page, setPage] = useState(1);
  const {
    data: rentalRequests,
    isLoading,
    error,
  } = useRentalListings({
    page,
    limit: 10,
  });
  const { mutate: deleteRentalListing, isPending: deleteLoading } =
    useDeleteRentalListing();

  const [search, setSearch] = useState("");
  const filteredRentalRequests = useMemo(() => {
    const rentalListings = rentalRequests?.data?.listings || [];
    return filterData({
      data: rentalListings,
      search,
      searchKeys: ["name", "subCategory.name", "leaser.name"],
    });
  }, [rentalRequests, search]);

  const cols = [
    "ID",
    "Product name",
    "Sub category",
    "Owner",
    "Created at",
    "Actions",
  ];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const row = (rentalRequest: RentalListing) => (
    <>
      <TableCell>{rentalRequest._id.slice(-4)}</TableCell>
      <div className="truncate  w-28"><HighlightCell text={rentalRequest.name} query={search} className="" /></div>
      <HighlightCell text={rentalRequest?.subCategory?.name} query={search} />
      <HighlightCell text={rentalRequest?.leaser?.name} query={search} />
      <TableCell>{rentalRequest.createdAt}</TableCell>
      <TableCell>
        <TableActions
          id={rentalRequest._id}
          baseRoute="/rental-listing"
          actions={["view", "delete"]}
          module="Rental Request"
          onDelete={(id, closeDialog) =>
            deleteRentalListing(id, {
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
    total: rentalRequests?.data?.total || 0,
    page: rentalRequests?.data?.page || 1,
    limit: rentalRequests?.data?.limit || 10,
    setPage: setPage,
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <SearchInput
        className="w-full ml-auto"
        onChange={(e) => setSearch(e)}
        placeholder="Search Rental Request"
      />
      <DataTable
        cols={cols}
        data={filteredRentalRequests}
        row={row}
        pagination={pagination}
      />
    </div>
  );
};

export default RentalListings;
