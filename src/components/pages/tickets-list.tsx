"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { DataTable } from "../custom/data-table";
import { Ticket } from "@/types";
import { TableCell } from "../ui/table";
import Status from "../status-badge";
import Link from "next/link";
const TicketsList = () => {
  const tickets = useSelector((state: RootState) => state.tickets);

  const cols = [
    "ID",
    "Sender",
    "Email",
    "Subject",
    "Created At",
    "Status",
    "Actions",
  ];

  const row = (ticket: Ticket, index: number) => (
    <>
      <TableCell>
        <Link href={`/tickets/${ticket._id}`}>{ticket._id}</Link>
      </TableCell>
      <TableCell>{ticket.sender}</TableCell>
      <TableCell>{ticket.email}</TableCell>
      <TableCell>{ticket.subject}</TableCell>
      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Status value={ticket.status} />
      </TableCell>
      <TableCell>...</TableCell>
    </>
  );

  return (
    <div>
      <DataTable cols={cols} data={tickets} row={row} />
    </div>
  );
};

export default TicketsList;
