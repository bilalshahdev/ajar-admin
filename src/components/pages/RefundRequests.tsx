"use client";

import { TableCell } from "@/components/ui/table";
import { useGetRefundRequests, useUpdateRefundRequest } from "@/hooks/useRefundManagement";
import { RefundRequest } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import { Label } from "../Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Status from "../StatusBadge";

const RefundRequests = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetRefundRequests(page, 10);
  const { mutate: updateRefundStatus, isPending: updateLoading } = useUpdateRefundRequest();
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

  const refundStatus = ["pending","accept", "reject"];

  const cols = [
    "id",
    "listing",
    "user",
    "dateSubmitted",
    "amount",
    "status",
    "actions",
  ];

  const row = (request: RefundRequest, index: number) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{request?.booking?.marketplaceListingId?.name}</TableCell>
      <TableCell>{request?.user?.name}</TableCell>
      <TableCell>{request?.createdAt}</TableCell>
      <TableCell>${request?.totalRefundAmount.toFixed(2)}</TableCell>
      <TableCell>
        <Status value={request?.status} />
      </TableCell>
      <TableCell>
        <Select
          defaultValue={request?.status}
          onValueChange={(value) =>
            updateRefundStatus({ id: request._id, data: { status: value } })
          }
          disabled={updateLoading}
        >
          <SelectTrigger className="capitalize w-[160px]">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  refundStatus.includes(request.status) ? "bg-green-500" : "bg-gray-300"
                )}
              />
              <SelectValue placeholder="Select status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {refundStatus.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
