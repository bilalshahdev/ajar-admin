"use client";

import { useDeleteQuery, useGetQueries } from "@/hooks/useQueries";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "./Actions";
import { DataTable } from "./custom/DataTable";
import { SearchInput } from "./custom/SearchInput";
import ResponseError from "./ResponseError";
import TableSkeleton from "./skeletons/TableSkeleton";
import Status from "./StatusBadge";
import Tooltip from "./Tooltip";
import { TableCell } from "./ui/table";
import { Query } from "@/types";
import HighlightCell from "./HighlightCell";

const Queries = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useGetQueries({ page: 1, limit: 10 });
  const { mutate: deleteQuery, isPending: deleteLoading } = useDeleteQuery();

  const queries = useMemo(() => {
    const raw = data?.data?.queries || [];

    const flattened = raw.map((q: Query) => ({
      ...q,
      name: q.user?.name || "",
      email: q.user?.email || "",
    }));

    return filterData({
      data: flattened,
      search,
      searchKeys: ["title", "status", "name", "email"],
    });
  }, [data, search]);

  const cols = [
    "Id",
    "sent by",
    "email",
    "title",
    "date",
    "status",
    "actions",
  ];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const row = (query: Query) => (
    <>
      <TableCell>{query._id.slice(-4)}</TableCell>
      <HighlightCell text={query?.user?.name} query={search} />
      <HighlightCell text={query?.user?.email} query={search} />
      <Tooltip content={query.title}>
        <HighlightCell text={query.title} query={search} />
      </Tooltip>
      <TableCell>
        {query.createdAt
          ? new Date(query.createdAt).toLocaleDateString()
          : "N/A"}
      </TableCell>

      <TableCell>{<Status value={query.status} />}</TableCell>
      <TableCell>
        <TableActions
          id={query._id}
          baseRoute="/query-management"
          actions={["delete"]}
          module="Query"
          onDelete={(id: string, closeDialog: () => void) =>
            deleteQuery(id, {
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

  return (
    <div>
      <SearchInput
        className="w-full ml-auto"
        onChange={(e: string) => setSearch(e)}
        placeholder="Search Ticket"
      />
      <DataTable cols={cols} data={queries} row={row} />
    </div>
  );
};

export default Queries;
