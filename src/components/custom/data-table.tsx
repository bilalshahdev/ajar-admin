"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps<T> = {
  data: T[];
  cols: string[];
  row: (row: T, index: number) => React.ReactNode;
  tableClassName?: string;
  bodyClassName?: string;
  headClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
};

export function DataTable<T>({
  data,
  cols,
  row,
  tableClassName,
  bodyClassName,
  headClassName,
  headerClassName,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <Table className={cn("", tableClassName)}>
      <TableHeader className={cn("", headerClassName)}>
        <TableRow className={cn("", rowClassName)}>
          {cols.map((col, i) => (
            <TableHead className={cn("capitalize", headClassName)} key={i}>
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={cn("", bodyClassName)}>
        {data.map((r, i) => (
          <TableRow className={cn("", rowClassName)} key={i}>
            {row(r, i)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
