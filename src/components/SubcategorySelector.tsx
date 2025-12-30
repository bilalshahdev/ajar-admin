"use client";

import { useEffect, useMemo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PencilIcon } from "lucide-react";

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
  slug?: string;
  description?: string;
};

const SubCategorySelector = ({
  zoneId,
  value,
  onChange,
}: {
  zoneId: string;
  value: string;
  onChange: (id: string) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const [selected, setSelected] = useState<SubCategory[]>([]);
  const [tempSelected, setTempSelected] = useState<SubCategory[]>([]);

  const { data: zone } = useGetZone(zoneId);
  const { data, isLoading, error } = useGetSubCategoriesList();
  const { mutateAsync, isPending } = useUpdateZoneCategories();

  const allSubcategories: SubCategory[] = useMemo(
    () => data?.data || [],
    [data]
  );

  useEffect(() => {
    if (zone?.data?.subCategories) {
      setSelected(zone.data.subCategories);
    }
  }, [zone?.data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSubcategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) &&
        !tempSelected.some((s) => s._id === cat._id)
    );
  }, [query, tempSelected, allSubcategories]);

  const handleSave = async () => {
    try {
      const ids = tempSelected.map((c) => c._id);

      await mutateAsync({
        id: zoneId,
        data: ids,
      });

      setSelected(tempSelected);
      setDialogOpen(false);

      if (!ids.includes(value)) {
        onChange("");
      }
    } catch {
      toast.error("Failed to update subcategories");
    }
  };

  return (
    <div>
      <Label className="mb-2 block">Subcategories</Label>
      <div className="relative w-full h-12 p-2 flex items-center border-2 rounded-md">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">Failed to load</p>
          ) : selected.length ? (
            selected.map((cat) => (
              <Badge
                key={cat._id}
                onClick={() => onChange(cat._id)}
                variant="secondary"
                className={cn(
                  "flex items-center px-2 py-1 text-sm cursor-pointer whitespace-nowrap",
                  value === cat._id
                    ? "bg-blue/30 hover:bg-blue/30"
                    : "hover:bg-blue/20"
                )}
              >
                {cat.name}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">No subcategories</p>
          )}
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (open) setTempSelected([...selected]);
          }}
        >
          <DialogTrigger asChild>
            <Button size="icon" className="absolute right-2" variant={"button"}>
              <PencilIcon />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Subcategories</DialogTitle>
              <DialogDescription>
                Add or remove subcategories for this zone
              </DialogDescription>
            </DialogHeader>

            <div
              className={cn(
                "border rounded-md p-2 flex flex-wrap gap-1",
                focused && "ring-2 ring-aqua"
              )}
              onClick={() => setFocused(true)}
            >
              {tempSelected.map((cat) => (
                <Badge key={cat._id} className="flex items-center gap-2">
                  {cat.name}
                  <GradientIcon
                    className="cursor-pointer"
                    icon={<AiOutlineCloseCircle size={16} />}
                    onClick={() =>
                      setTempSelected((p) =>
                        p.filter((s) => s._id !== cat._id)
                      )
                    }
                  />
                </Badge>
              ))}

              <input
                className="flex-1 bg-transparent outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
              />
            </div>

            {focused && (
              <ScrollArea className="max-h-48 mt-2">
                {filtered.map((cat) => (
                  <div
                    key={cat._id}
                    onMouseDown={() =>
                      setTempSelected((p) => [...p, cat])
                    }
                    className="cursor-pointer px-3 py-2 hover:bg-secondary"
                  >
                    {cat.name}
                  </div>
                ))}
              </ScrollArea>
            )}

            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubCategorySelector;
