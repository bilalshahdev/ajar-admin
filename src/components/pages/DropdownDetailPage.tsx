"use client";

import { useMemo, useState } from "react";

import {
  useAddDropdownValue,
  useGetDropdownByName,
  useRemoveDropdownValue
} from "@/hooks/useDropdowns";

import Loading from "../Loading";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Dropdown } from "@/types";
import { Database, Search, TriangleAlert, XCircle } from "lucide-react";

import { AddValueForm } from "../forms/AddValueForm";
import { useTranslations } from "next-intl";

export default function DropdownDetails({ name }: { name: string }) {
  const t = useTranslations();
  const { data, isLoading, isError } = useGetDropdownByName(name, true);
  const doc: Dropdown | undefined = data?.data;

  const { mutateAsync: addValue, isPending: adding } = useAddDropdownValue();
  const { mutateAsync: removeValue, isPending: removing } =
    useRemoveDropdownValue();

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const list = doc?.values ?? [];
    if (!q.trim()) return list;
    const qq = q.toLowerCase();
    return list.filter(
      (v) =>
        v.name.toLowerCase().includes(qq) || v.value.toLowerCase().includes(qq)
    );
  }, [doc?.values, q]);


  const handleRemoveValue = async (val: string) => {
    if (!doc?.name) return;
    try {
      await removeValue({ name: doc.name, value: val });
    } catch (e: any) {
      console.log(e);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <TooltipProvider delayDuration={100}>
      <div>
        <div className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl sm:text-2xl capitalize">{doc?.name ?? ""}</div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="secondary" className="gap-1">
                  <Database className="h-3.5 w-3.5" />
                  {doc?.values?.length ?? 0} {t("translation.values")}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="pt-6 space-y-6">
          {isError && (
            <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <TriangleAlert className="h-4 w-4" />
              {t("failedToLoadDropdown")}
            </div>
          )}

          {!doc && !isError && (
            <div className="text-sm text-muted-foreground">
              {t("noDropdownFound")}
            </div>
          )}

          {doc && (
            <>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("search.searchByNameOrValue")}
                  className="pl-8"
                />
              </div>

              <AddValueForm doc={doc} addValue={addValue} adding={adding} />

              {/* Values table */}
              <div className="rounded-xl border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">{t(`translation.name`)}</TableHead>
                      <TableHead>{t(`translation.value`)}</TableHead>
                      <TableHead className="w-[60px] text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filtered.length ? filtered : doc.values).map((v, i) => (
                      <TableRow
                        key={`${v.name}-${i}`}
                        className="hover:bg-muted/40"
                      >
                        <TableCell className="font-medium">{v.name}</TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-2 py-1 text-xs">
                            {v.value}
                          </code>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveValue(v.value)}
                            disabled={removing}
                          >
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(filtered.length ? filtered : doc.values).length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-sm text-muted-foreground"
                        >
                          No values to display.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
