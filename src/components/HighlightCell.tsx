"use client";

import * as React from "react";
import { TableCell } from "./ui/table"; // adjust the path if needed

type HighlightCellProps = {
  text: string;
  query: string;
} & React.ComponentProps<typeof TableCell>;

const HighlightCell = ({ text, query, ...props }: HighlightCellProps) => {
  if (!query) {
    return <TableCell {...props}>{text}</TableCell>;
  }

  const regex = new RegExp(`(${query})`, "ig");
  const parts = text?.split(regex);

  return (
    <TableCell {...props}>
      {parts?.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-foreground text-background">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </TableCell>
  );
};

export default HighlightCell;
