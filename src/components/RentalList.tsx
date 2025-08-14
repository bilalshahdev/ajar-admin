"use client";

import { TableCell } from "@/components/ui/table";
import { RentalRequest } from "@/types";
import { filterData } from "@/utils/filterData";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "./custom/DataTable";
import { FilterButton } from "./custom/FilterButton";
import { SearchInput } from "./custom/SearchInput";
import { Label } from "./Typography";
import Status from "./StatusBadge";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const RentalList = ({ requests }: { requests: RentalRequest[] }) => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRequests = useMemo(() => {
    return filterData({
      data: requests,
      search,
      searchKeys: ["name", "price", "status"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [requests, search, selectedStatus]);

  const cols = [
    "Id",
    "Product Name",
    "Category",
    "Owner",
    "Date",
    "Status",
    "Actions",
  ];

  const row = (request: RentalRequest, index: number) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Link
          href={`/rental-listing/${request._id}`}
          className="cursor-pointer"
        >
          {request.name}
        </Link>
      </TableCell>
      <TableCell>{request.subcategory.name}</TableCell>
      <TableCell>{request.leaser.name}</TableCell>
      <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
      <TableCell>
        <Status value={request.status} />
      </TableCell>
      <TableCell>
        <div className="">...</div>
      </TableCell>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label>List of rental requests</Label>
        <div className="flex gap-2">
          <SearchInput
            placeholder="Search rental request"
            onChange={(e) => setSearch(e)}
            debounceDelay={500}
          />

          <FilterButton
            label="Status"
            value={selectedStatus}
            onChange={(val) => setSelectedStatus(val as string)}
            options={statusOptions}
          />
        </div>
      </div>
      <DataTable data={filteredRequests} cols={cols} row={row} />
    </div>
  );
};

export default RentalList;

const ProductInfo = ({
  name,
  description,
  price,
  images,
  date,
  status,
  subcategory,
  leaser,
  renter,
}: RentalRequest) => {
  return (
    <div className="flex flex-col gap-4">
      <Label>{name}</Label>
      <Label>{description}</Label>
      <Label>{price}</Label>
      <Label>{date}</Label>
      <Label>{status}</Label>
      <Label>{subcategory.name}</Label>
      <Label>{leaser.name}</Label>
      <Label>{renter.name}</Label>
    </div>
  );
};
