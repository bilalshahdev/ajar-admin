"use client";

import { useDeleteTicket, useGetTickets } from "@/hooks/useTickets";
import { Ticket } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import Tooltip from "../Tooltip";
import { TableCell } from "../ui/table";
import Status from "../StatusBadge";
import Link from "next/link";
import HighlightCell from "../HighlightCell";

const TicketsList = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useGetTickets({ page: 1, limit: 10 });
  const { mutate: deleteTicket, isPending: deleteLoading } = useDeleteTicket();

  const tickets = useMemo(() => {
    const raw = data?.data?.tickets || [];

    const flattened = raw.map((t: any) => ({
      ...t,
      name: t.user?.name || "",
      email: t.user?.email || "",
    }));

    return filterData({
      data: flattened,
      search,
      searchKeys: ["rentalText", "status", "name", "email"],
    });
  }, [data, search]);

  const cols = [
    "ID",
    "Sender",
    "Email",
    "Subject",
    "Created At",
    "Status",
    "Actions",
  ];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const row = (ticket: Ticket) => {
    return (
      <>
        <TableCell>
          <Link href={`/tickets/${ticket._id}`}>
            <span className="underline">{ticket._id?.slice(-4)}</span>
          </Link>
        </TableCell>
        <HighlightCell text={ticket.user?.name || "Unknown"} query={search} />
        <HighlightCell
          className=""
          text={ticket.user?.email || "Unknown"}
          query={search}
        />

        <Tooltip content={ticket.rentalText}>
          <HighlightCell text={ticket.rentalText || "Unknown"} query={search} />
        </Tooltip>
        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>
          <Status value={ticket.status} />
        </TableCell>
        <TableCell>
          <TableActions
            id={ticket._id}
            baseRoute="/tickets"
            module="Ticket"
            actions={["delete"]}
            onDelete={(id, closeDialog) =>
              deleteTicket(id, {
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
  };

  return (
    <div>
      <SearchInput
        className="w-full ml-auto"
        onChange={(e) => setSearch(e)}
        placeholder="Search Ticket"
      />
      <DataTable cols={cols} data={tickets} row={row} />
    </div>
  );
};

export default TicketsList;
