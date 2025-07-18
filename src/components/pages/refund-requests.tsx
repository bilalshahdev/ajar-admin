"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import StatsCard from "../cards/stats-card";

import { TableCell } from "@/components/ui/table";
import { RefundRequest } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import { DataTable } from "../custom/data-table";
import { SearchInput } from "../custom/search-input";
import Status from "../status-badge";
import { Label } from "../typography";

const RefundRequests = () => {
  const refundRequests = useSelector(
    (state: RootState) => state.refundRequests
  );

  const refundStats = [
    {
      title: "Total Refund Requests",
      value: refundRequests.length,
      bgColor: "",
    },
    {
      title: "Approved Refund Requests",
      value: refundRequests.filter((request) => request.status === "approved")
        .length,
      bgColor: "",
    },
    {
      title: "Rejected Refund Requests",
      value: refundRequests.filter((request) => request.status === "rejected")
        .length,
      bgColor: "",
    },
    {
      title: "Pending Refund Requests",
      value: refundRequests.filter((request) => request.status === "pending")
        .length,
      bgColor: "",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRefundRequests = useMemo(() => {
    return filterData({
      data: refundRequests,
      search,
      searchKeys: ["listing", "user"],
      filters: {
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      },
    });
  }, [refundRequests, search, selectedStatus]);

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

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {refundStats.map((data) => (
          <StatsCard key={data.title} {...data} />
        ))}
      </div>

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
        <DataTable data={filteredRefundRequests} cols={cols} row={row} />
      </div>
    </div>
  );
};

export default RefundRequests;
