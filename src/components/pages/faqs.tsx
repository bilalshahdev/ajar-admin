"use client";

import { useDeleteFaq, useGetFaqs } from "@/hooks/useFaqs";
import { Faq } from "@/types";
import { filterData } from "@/utils/filterData";
import { useMemo, useState } from "react";
import TableActions from "../Actions";
import { DataTable } from "../custom/DataTable";
import { SearchInput } from "../custom/SearchInput";
import FaqForm from "../forms/FaqForm";
import ResponseError from "../ResponseError";
import TableSkeleton from "../skeletons/TableSkeleton";
import Tooltip from "../Tooltip";
import { TableCell } from "../ui/table";

const Faqs = () => {
  const { data, isLoading, error } = useGetFaqs({ page: 1, limit: 10 });
  const [search, setSearch] = useState("");

  // ✅ Moved faqs inside useMemo to avoid eslint warning
  const filteredFaqs = useMemo(() => {
    const faqs = data?.data?.data || [];
    return filterData({
      data: faqs,
      search,
      searchKeys: ["question", "answer"],
    });
  }, [data, search]);

  const { mutate: deleteFaq, isPending: deleteLoading } = useDeleteFaq();

  const cols = ["Question", "Answer", "Actions"];

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

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
            onDelete={(id, closeDialog) =>
              deleteFaq(id, {
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
        placeholder="Search Faq"
      />
      <DataTable cols={cols} data={filteredFaqs} row={row} />
    </div>
  );
};

export default Faqs;
