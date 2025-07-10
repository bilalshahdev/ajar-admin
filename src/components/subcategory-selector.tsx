"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import GradientIcon from "./gradient-icon";
import { Label } from "./typography";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useController } from "react-hook-form";

type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

const subcategories = [
  {
    _id: "64b8e89f7a4f9a6b7b1c0001",
    name: "Electronics",
    slug: "electronics",
  },
  {
    _id: "64b8e89f7a4f9a6b7b1c0002",
    name: "Mobile Phones",
    slug: "mobile-phones",
  },
  {
    _id: "64b8e89f7a4f9a6b7b1c0003",
    name: "Fashion",
    slug: "fashion",
  },
  {
    _id: "64b8e89f7a4f9a6b7b1c0004",
    name: "Men's Wear",
    slug: "mens-wear",
  },
];

const SubCategorySelector = ({
  control,
  name,
}: {
  control: any;
  name: string;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SubCategory[]>([]);
  const [focused, setFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subcategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) &&
        !selected.find((s) => s._id === cat._id)
    );
  }, [query, selected]);
  const [activeDetail, setActiveDetail] = useState<SubCategory | null>(null);

  const handleSelect = (cat: SubCategory) => {
    if (!selected.find((s) => s._id === cat._id)) {
      setSelected((prev) => [...prev, cat]);
    }
    setQuery("");
    // setActiveDetail(cat);
  };

  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((s) => s._id !== id));
    setActiveDetail(null);
  };

  return (
    <div className="">
      <div className="relative">
        <Label className="mb-2">Subcategories</Label>
        <div
          className={cn(
            "relative w-full h-12 rounded-md px-3 py-1.5 flex flex-wrap items-center gap-1 border-2 border-t-aqua border-b-blue border-l-blue border-r-aqua hover:ring ring-aqua"
          )}
        >
          {selected.length > 0 ? (
            selected.map((cat) => (
              <Badge
                key={cat._id}
                variant="secondary"
                className={cn(
                  "flex items-center px-3 py-[6px] text-sm cursor-pointer",
                  activeDetail?._id === cat._id
                    ? "bg-blue/30 hover:bg-blue/30"
                    : "hover:bg-blue/20"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDetail(cat);
                  field.onChange(cat._id);
                }}
              >
                {cat.name}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">No Subcategory Selected</p>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="button"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <PencilIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subcategories</DialogTitle>
                <DialogDescription>
                  Add/Remove subcategories for this zone
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
                  {selected.map((cat) => (
                    <Badge
                      key={cat._id}
                      variant="secondary"
                      className={cn(
                        "flex items-center px-2 py-0.5 text-sm cursor-pointer"
                        // activeDetail?._id === cat._id
                        //   ? "bg-blue/30 hover:bg-blue/30"
                        //   : "hover:bg-blue/20"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {cat.name}
                      <GradientIcon
                        className="ml-1"
                        icon={<AiOutlineCloseCircle size={24} />}
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
                    placeholder="Select subcategories..."
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
                              onMouseDown={() => handleSelect(cat)}
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
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SubCategorySelector;
