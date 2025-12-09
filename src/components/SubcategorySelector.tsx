"use client";

import { useEffect, useMemo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PencilIcon } from "lucide-react";
import { useController } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/Typography";
import GradientIcon from "./GradientIcon";
import Loader from "@/components/Loader";

import { cn } from "@/lib/utils";
import { useGetSubCategoriesList } from "@/hooks/useCategories";
import { useGetZone, useUpdateZoneCategories } from "@/hooks/useZones";
import { toast } from "sonner";

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

const SubCategorySelector = ({
  zoneId,
  onChange,
  value,
}: {
  zoneId: string;
  onChange: (value: string) => void;
  value: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelectedSubcategories, setTempSelectedSubcategories] = useState<
    SubCategory[]
  >([]);
  const [query, setQuery] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    SubCategory[]
  >([]);
  const [focused, setFocused] = useState(false);

  const {
    data: zone,
    isLoading: zoneLoading,
    error: zoneError,
  } = useGetZone(zoneId);

  const subCategories: SubCategory[] = zone?.data?.subCategories || [];

  const { data, isLoading, error } = useGetSubCategoriesList();
  const subcategoriesList = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (zone?.data) {
      setSelectedSubcategories(zone.data.subCategories);
    }
  }, [zone?.data]);

  const {
    mutateAsync: updateZoneCategories,
    isPending: updating,
    error: updateError,
  } = useUpdateZoneCategories();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subcategoriesList.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) &&
        !selectedSubcategories.some((s) => s._id === cat._id)
    );
  }, [query, selectedSubcategories, subcategoriesList]);

  const handleSelect = (cat: SubCategory) => {
    if (!tempSelectedSubcategories.some((s) => s._id === cat._id)) {
      setTempSelectedSubcategories((prev) => [...prev, cat]);
    }
    setQuery("");
  };

  const handleRemove = (id: string) => {
    setTempSelectedSubcategories((prev) => prev.filter((s) => s._id !== id));
  };

  const handleSave = async () => {
    try {
      const selectedIds = tempSelectedSubcategories.map((cat) => cat._id);
      await updateZoneCategories({
        id: zoneId,
        data: selectedIds,
      });

      if (!selectedIds.includes(value)) {
        onChange("");
      }

      setSelectedSubcategories(tempSelectedSubcategories);
      setDialogOpen(false);
    } catch (err: any) {
      console.log(err);
      toast.error(updateError?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Label className="mb-2 block">Subcategories</Label>
      <div className="relative w-full h-12 rounded-md px-3 py-1.5 flex items-center justify-between gap-2 border-2 border-t-aqua border-b-blue border-l-blue border-r-aqua hover:ring ring-aqua">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">Error loading subcategoriesList</p>
          ) : subCategories?.length > 0 ? (
            subCategories?.map((cat) => (
              <Badge
                key={cat._id}
                variant="secondary"
                className={cn(
                  "flex items-center px-3 py-[6px] text-sm cursor-pointer whitespace-nowrap",
                  value === cat._id
                    ? "bg-blue/30 hover:bg-blue/30"
                    : "hover:bg-blue/20"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(cat._id);
                }}
              >
                {cat.name}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">No Subcategory Selected</p>
          )}
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (open) {
              setTempSelectedSubcategories([...selectedSubcategories]);
            }
          }}
        >
          <DialogTrigger asChild disabled={isLoading}>
            <Button
              variant="button"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PencilIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Subcategories</DialogTitle>
              <DialogDescription>
                Add or remove subcategoriesList for this zone.
              </DialogDescription>
            </DialogHeader>

            <div className="relative">
              <div
                className={cn(
                  "relative w-full rounded-md px-3 py-1.5 flex flex-wrap items-center gap-1 border-2 border-t-aqua border-b-blue border-l-blue border-r-aqua",
                  focused ? "ring-2 ring-aqua" : "hover:ring ring-aqua"
                )}
                onClick={() => {
                  setFocused(true);
                  document.getElementById("subcategory-input")?.focus();
                }}
              >
                {tempSelectedSubcategories.map((cat) => (
                  <Badge
                    key={cat._id}
                    variant="secondary"
                    className="flex items-center gap-2 px-2 py-0.5 text-sm cursor-pointer"
                  >
                    {cat.name}
                    <GradientIcon
                      className="ml-1 mt-2"
                      icon={<AiOutlineCloseCircle size={18} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(cat._id);
                      }}
                    />
                  </Badge>
                ))}

                <input
                  id="subcategory-input"
                  className="flex-1 bg-transparent outline-none text-sm min-w-[120px]"
                  placeholder="Search subcategoriesList..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                />
              </div>

              {focused && (
                <div className="absolute z-10 w-full mt-1 border rounded-md bg-background shadow max-h-60 overflow-hidden">
                  <ScrollArea className="max-h-60">
                    {filtered.length === 0 ? (
                      <div className="p-3 text-sm text-muted-foreground">
                        No results
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 p-2">
                        {filtered.map((cat) => (
                          <div
                            key={cat._id}
                            onMouseDown={() => handleSelect(cat as SubCategory)}
                            className="flex items-center cursor-pointer bg-secondary hover:bg-aqua/40 px-4 py-2 rounded-full text-sm"
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              )}
            </div>

            <Button onClick={handleSave} disabled={updating} variant={"button"}>
              {updating ? "Saving..." : "Save"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubCategorySelector;
