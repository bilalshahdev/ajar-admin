"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Faq } from "@/types";
import Link from "next/link";
import { DataTable } from "../custom/data-table";
import { TableCell } from "../ui/table";
import TableActions from "../actions";
import FaqForm from "../forms/faq-form";
import Tooltip from "../tooltip";
import { useMemo, useState } from "react";
import { SearchInput } from "../custom/search-input";
import { filterData } from "@/utils/filterData";

const Faqs = () => {
  const { faqs } = useSelector((state: RootState) => state.faqs);
  const [search, setSearch] = useState("");
  const filteredFaqs = useMemo(() => {
    return filterData({
      data: faqs,
      search,
      searchKeys: ["question", "answer"],
    });
  }, [faqs, search]);

  const cols = ["Question", "Answer", "Actions"];
  const row = (faq: Faq) => {
    return (
      <>
        <TableCell className="max-w-20 truncate">
          <Tooltip content={faq.question}>
            <span>{faq.question}</span>
          </Tooltip>
        </TableCell>
        <TableCell className="max-w-60 truncate">
          <Tooltip content={faq.answer}>
            <span>{faq.answer}</span>
          </Tooltip>
        </TableCell>
        <TableCell>
          <TableActions
            id={faq._id}
            baseRoute="/faqs"
            module="Faq"
            editDialog={{
              title: "Edit Faq",
              content: <FaqForm id={faq._id} />,
            }}
            actions={["edit", "delete"]}
            onDelete={(id) => console.log("deleted:", id)}
            deleteLoading={false}
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
        placeholder="Search Faq"
      />
      <DataTable cols={cols} data={filteredFaqs} row={row} />
    </div>
  );
};

export default Faqs;
