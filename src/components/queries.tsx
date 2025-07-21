"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { DataTable } from "./custom/data-table";
import { TableCell } from "./ui/table";
import TableActions from "./actions";
import Status from "./status-badge";
import { useState } from "react";
import { useMemo } from "react";
import { filterData } from "@/utils/filterData";
import { SearchInput } from "./custom/search-input";
import { Label } from "./typography";
const Queries = () => {
  const queries = useSelector((state: RootState) => state.queries.queries);
  const [search, setSearch] = useState("");
  const filteredQueries = useMemo(() => {
    return filterData({
      data: queries,
      search,
      searchKeys: ["title"],
    });
  }, [queries, search]);
  const cols = [
    "Id",
    "sent by",
    "email",
    "title",
    "created at",
    "status",
    "actions",
  ];
  const row = (query: any) => (
    <>
      <TableCell>{query._id}</TableCell>
      <TableCell>{query.sentBy?.name}</TableCell>
      <TableCell>{query.sentBy?.email}</TableCell>
      <TableCell>{query.title}</TableCell>
      <TableCell>{new Date(query.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{<Status value={query.status} />}</TableCell>
      <TableCell>
        <TableActions
          id={query._id}
          baseRoute="/query-management"
          actions={["delete"]}
          module="Query"
          onDelete={(id) => console.log("deleted:", id)}
          deleteLoading={false}
        />
      </TableCell>
    </>
  );
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label>Queries</Label>
        <div className="flex gap-2">
          <SearchInput
            placeholder="Search Query"
            onChange={(e) => setSearch(e)}
            debounceDelay={500}
          />
        </div>
      </div>
      <DataTable cols={cols} data={filteredQueries} row={row} />
    </div>
  );
};

export default Queries;
