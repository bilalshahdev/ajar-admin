"use client";

import { TableCell } from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useDeleteDropdown, useGetDropdowns } from "@/hooks/useDropdowns";
import { Dropdown } from "@/types";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";

export function DropdownsPage() {
  const [page, setPage] = useState(1);

  // reset page on search change
  useEffect(() => {
    setPage(1);
  }, []);

  const query = useMemo(
    () => ({
      page,
      limit: 10,
    }),
    [page]
  );

  const { data, isLoading } = useGetDropdowns(query);
  const { mutateAsync: deleteDropdown } = useDeleteDropdown();

  const dropdowns: Dropdown[] = data?.data ?? [];

  const cols = useMemo(() => ["Name", "Values", "actions"], []);

  const rows = (row: Dropdown) => {
    return (
      <>
        <TableCell className="font-medium">{row.name}</TableCell>
        <TableCell>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="text-blue-500">{`${
                row.values?.length ?? 0
              } values`}</div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-wrap gap-2">
                {row.values?.map((v) => (
                  <Badge key={v.name}>{v.name}</Badge>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </TableCell>

        <TableCell className="text-right">
          <TableActions
            id={row.name}
            baseRoute="/dropdowns"
            actions={["edit", "delete"]}
            onDelete={(id) => deleteDropdown(id)}
          />
        </TableCell>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">Loading…</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <DataTable
          data={dropdowns}
          cols={cols}
          row={rows}
          pagination={{
            total: data?.pagination?.total,
            limit: data?.pagination?.limit,
            page: data?.pagination?.page ?? page,
            setPage,
          }}
        />
      </div>
    </div>
  );
}
