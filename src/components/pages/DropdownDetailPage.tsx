"use client";

import { useMemo, useState } from "react";

import {
  useAddDropdownValue,
  useGetDropdownByName,
  useRemoveDropdownValue,
  useUpdateDropdownValueSettings
} from "@/hooks/useDropdowns";

import Loading from "../Loading";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { Dropdown, DropdownValue } from "@/types";
import { Database, Search, Settings2, TriangleAlert, XCircle } from "lucide-react";

import ConfirmDialog from "../ConfirmDialog";
import { AddValueForm } from "../forms/AddValueForm";
import { useTranslations } from "next-intl";

export default function DropdownDetails({ name }: { name: string }) {
  const t = useTranslations();
  const { data, isLoading, isError } = useGetDropdownByName(name, true);
  const doc: Dropdown | undefined = data?.data;

  const { mutateAsync: addValue, isPending: adding } = useAddDropdownValue();
  const { mutateAsync: removeValue, isPending: removing } =
    useRemoveDropdownValue();
  const { mutateAsync: updateValueSettings, isPending: updatingValueSettings } =
    useUpdateDropdownValueSettings();

  const isDocumentType = doc
    ? ["leaserDocuments", "renterDocuments", "userDocuments"].includes(doc.name)
    : false;
  const showAutoApproval = name !== "leaserDocuments";
  const [q, setQ] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropdownValue | null>(null);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [autoApproval, setAutoApproval] = useState(false);

  const filtered = useMemo(() => {
    const list = doc?.values ?? [];
    if (!q.trim()) return list;
    const qq = q.toLowerCase();
    return list.filter(
      (v) =>
        v.name.toLowerCase().includes(qq) || v.value.toLowerCase().includes(qq)
    );
  }, [doc?.values, q]);


  const handleRemoveValue = async (val: string, closeDialog?: () => void) => {
    if (!doc?.name) return;
    try {
      await removeValue({ name: doc.name, value: val });
      closeDialog?.();
    } catch (e: any) {
      console.log(e);
    }
  };

  const openSettingsDialog = (value: DropdownValue) => {
    setSelectedValue(value);
    setHasExpiry(!!value.hasExpiry);
    setAutoApproval(!!value.autoApproval);
    setSettingsOpen(true);
  };

  const handleUpdateValueSettings = async () => {
    if (!doc?.name || !selectedValue?._id) return;

    try {
      await updateValueSettings({
        name: doc.name,
        data: {
          _id: selectedValue._id,
          hasExpiry,
          ...(showAutoApproval ? { autoApproval } : {}),
        },
      });
      setSettingsOpen(false);
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

              <AddValueForm doc={doc} addValue={addValue} adding={adding} name={name} />

              {/* Values table */}
              <div className="rounded-xl border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">{t(`translation.name`)}</TableHead>
                      <TableHead>{t(`translation.value`)}</TableHead>
                      {isDocumentType && <TableHead>{t(`translation.hasExpiry`)}</TableHead>}
                      {isDocumentType && showAutoApproval && <TableHead>{t(`translation.autoApproval`)}</TableHead>}
                      <TableHead className="w-[60px] text-right">{t(`translation.actions`)}</TableHead>
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
                          <code className="rounded bg-muted px-2 py-1 text-xs">{v.value}</code>
                        </TableCell>
                        {isDocumentType && (
                          <TableCell>
                            <Badge variant={v.hasExpiry ? "default" : "secondary"}>
                              {v.hasExpiry ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                        )}
                        {isDocumentType && showAutoApproval && (
                          <TableCell>
                            <Badge variant={v.autoApproval ? "default" : "secondary"}>
                              {v.autoApproval ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                        )}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {isDocumentType && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openSettingsDialog(v)}
                                disabled={!v._id || updatingValueSettings}
                              >
                                <Settings2 className="h-4 w-4" />
                              </Button>
                            )}
                            <ConfirmDialog
                              title="Delete value?"
                              description="This value will be removed from the dropdown."
                              confirmText="Delete"
                              variant="destructive"
                              loading={removing}
                              asChild
                              onConfirm={(closeDialog) =>
                                handleRemoveValue(v.value, closeDialog)
                              }
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={removing}
                              >
                                <XCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            </ConfirmDialog>
                          </div>
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

              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update value settings</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <div className="text-sm font-medium">{selectedValue?.name}</div>
                      <code className="text-xs text-muted-foreground">
                        {selectedValue?.value}
                      </code>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="editHasExpiry"
                        checked={hasExpiry}
                        onCheckedChange={(checked) => setHasExpiry(checked === true)}
                        disabled={updatingValueSettings}
                      />
                      <label
                        htmlFor="editHasExpiry"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        Has Expiry
                      </label>
                    </div>

                    {showAutoApproval && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="editAutoApproval"
                          checked={autoApproval}
                          onCheckedChange={(checked) =>
                            setAutoApproval(checked === true)
                          }
                          disabled={updatingValueSettings}
                        />
                        <label
                          htmlFor="editAutoApproval"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Auto Approval
                        </label>
                      </div>
                    )}
                  </div>

                  <DialogFooter className="gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSettingsOpen(false)}
                      disabled={updatingValueSettings}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleUpdateValueSettings}
                      disabled={!selectedValue?._id || updatingValueSettings}
                    >
                      {updatingValueSettings ? "Updating..." : "Update"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
