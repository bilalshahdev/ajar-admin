"use client";

import { TableCell } from "@/components/ui/table";
import { useGetRefundRequests } from "@/hooks/useRefundManagement";
import { RefundRequest } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import Status from "../StatusBadge";
import { Label } from "../Typography";

const RefundRequests = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetRefundRequests(page, 10);

  const {
    data: refundRequests = [],
    total,
    page: currentPage,
    limit,
  } = data || {};

  const [search, setSearch] = useState("");

  const filteredRefundRequests: any = useMemo(() => {
    return filterData({
      data: refundRequests || [],
      search,
      searchKeys: ["listing", "user"],
      filters: {},
    });
  }, [refundRequests, search]);

  const cols = [
    "ID",
    "Listing",
    "User",
    "Date Submitted",
    "Amount",
    "Status",
    "Actions",
  ];

  const row = (request: RefundRequest, index: number) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{request.listing}</TableCell>
      <TableCell>{request.user}</TableCell>
      <TableCell>{request.dateSubmitted}</TableCell>
      <TableCell>{request.amount}</TableCell>
      <TableCell>
        <Status value={request.status} />
      </TableCell>
      <TableCell>
        <div className="">...</div>
      </TableCell>
    </>
  );
  const pagination = {
    total,
    page: currentPage,
    limit,
    setPage,
  };

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;
  
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>List of Refund Requests</Label>
          <div className="flex gap-2">
            <SearchInput
              placeholder="Search Refund Request"
              onChange={(e) => setSearch(e)}
              debounceDelay={500}
            />
          </div>
        </div>
        <DataTable
          data={filteredRefundRequests}
          cols={cols}
          row={row}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default RefundRequests;
