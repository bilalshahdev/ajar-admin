"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useAddEmployeeRole,
  useGetEmployeeRole,
  useUpdateEmployeeRole,
} from "@/hooks/useEmployees";
import { EmployeeRole, Permission } from "@/types";
import { ChevronsUpDown, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const accessOptions = [
  { value: "stats", label: "Stats" },
  { value: "zone", label: "Zone" },
  { value: "category", label: "Category" },
  { value: "field", label: "Field" },
  { value: "users", label: "Users" },
  { value: "listing", label: "Listing" },
  { value: "business", label: "Business" },
  { value: "tickets", label: "Tickets" },
  { value: "refund", label: "Refund" },
  { value: "employee", label: "Employee" },
  { value: "analytics", label: "Analytics" },
  { value: "messages", label: "Messages" },
  { value: "support", label: "Support" },
  { value: "faqs", label: "FAQs" },
  { value: "user", label: "User" },
  { value: "reports", label: "Reports" },
  { value: "rental-policies", label: "Rental Policies" },
  { value: "business-info", label: "Business Info" },
  { value: "payment-methods", label: "Payment Methods" },
  { value: "sms", label: "SMS" },
  { value: "mail", label: "Mail" },
  { value: "map", label: "Map" },
  { value: "socials", label: "Socials" },
  { value: "recaptcha", label: "Recaptcha" },
  { value: "firebase", label: "Firebase" },
];

const operationsOptions: { value: string; label: string }[] = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

const EmployeeRoleForm = ({
  id,
  closeDialog,
}: {
  id?: string;
  closeDialog?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [permission, setPermission] = useState<Permission>({
    access: "",
    operations: [] as string[],
  });

  const [allowAccess, setAllowAccess] = useState<EmployeeRole>({
    name: "",
    permissions: [],
  });

  const isEdit = !!id;
  const { data, isLoading } = useGetEmployeeRole(id || "");

  useEffect(() => {
    if (isEdit && data) {
      setAllowAccess(data.data);
    }
  }, [data, isEdit]);

  const toggleOperation = (operation: string, checked: boolean) => {
    setPermission((prev) => ({
      ...prev,
      operations: checked
        ? [...prev.operations, operation]
        : prev.operations.filter((op) => op !== operation),
    }));
  };

  const disableAddPermission = () => {
    return !permission.access || permission.operations.length === 0;
  };

  const addPermission = () => {
    if (disableAddPermission()) return;

    setAllowAccess((prev: any) => {
      const exists = prev.permissions.find(
        (p: any) => p.access === permission.access
      );

      let updatedPermissions;
      if (exists) {
        updatedPermissions = prev.permissions.map((p: any) =>
          p.access === permission.access
            ? {
                ...p,
                operations: [
                  ...new Set([...p.operations, ...permission.operations]),
                ],
              }
            : p
        );
      } else {
        // Prepend new permission to show on top
        updatedPermissions = [permission, ...prev.permissions];
      }

      return { ...prev, permissions: updatedPermissions };
    });

    setPermission({ access: "", operations: [] });
    setValue("");
  };

  const removePermission = (access: string) => {
    const newPermissions = allowAccess.permissions.filter(
      (p: any) => p.access !== access
    );
    setAllowAccess({ ...allowAccess, permissions: newPermissions });
  };

  const { mutateAsync: addEmployeeRoleMutation, isPending: addLoading } =
    useAddEmployeeRole();
  const { mutateAsync: updateEmployeeRoleMutation, isPending: updateLoading } =
    useUpdateEmployeeRole();

  if (isEdit && !allowAccess && !isLoading) {
    toast.error("Employee role not found");
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateEmployeeRoleMutation({
        employeeRoleId: id || "",
        data: allowAccess,
      });
    } else {
      addEmployeeRoleMutation(allowAccess);
    }
    closeDialog?.();
  };

  // Exclude already added permissions
  const availableAccessOptions = accessOptions.filter(
    (opt) => !allowAccess.permissions.some((p) => p.access === opt.value)
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Role Name */}
      <div className="space-y-2">
        <Label>Role name</Label>
        <Input
          type="text"
          placeholder="Role name"
          value={allowAccess.name}
          onChange={(e) =>
            setAllowAccess({ ...allowAccess, name: e.target.value })
          }
        />
      </div>

      {/* Permission Selection */}
      <div className="space-y-2 border rounded-lg p-3">
        <Label>Add Permission</Label>
        <div className="flex items-center justify-between gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex-1 justify-between"
              >
                {value
                  ? accessOptions.find((a) => a.value === value)?.label
                  : "Select access..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-50" align="start">
              <Command>
                <CommandInput placeholder="Search permission..." />
                <CommandEmpty>No permission found.</CommandEmpty>
                <CommandGroup className="h-48 overflow-scroll">
                  {availableAccessOptions.map((access) => (
                    <CommandItem
                      key={access.value}
                      onSelect={() => {
                        setPermission({ access: access.value, operations: [] });
                        setValue(access.value);
                        setOpen(false);
                      }}
                    >
                      {access.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            variant="default"
            onClick={addPermission}
            disabled={disableAddPermission()}
          >
            Add
          </Button>
        </div>
        {/* i want the label of text also to be clickable and make checkbox check uncheck */}
        {/* Operations Checkboxes */}
        {permission.access && (
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {operationsOptions.map((operation) => (
              <div key={operation.value} className="flex items-center gap-2">
                <Checkbox
                  checked={permission.operations.includes(operation.value)}
                  onCheckedChange={(checked) =>
                    toggleOperation(operation.value, !!checked)
                  }
                />
                <Label>{operation.label}</Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Added Permissions */}
      {allowAccess?.permissions?.length ? (
        <div>
          <Label className="font-medium text-base">Permissions</Label>
          <div className="max-h-32 overflow-scroll rounded-lg border p-2 space-y-2">
            {allowAccess.permissions.map(({ access, operations }: any, i) => (
              <div
                key={i}
                className="flex items-center justify-between capitalize"
              >
                <div className="flex items-center gap-2">
                  <Label className="font-medium text-xs">{access}</Label>
                  {operations?.map((op: any, j: any) => (
                    <span
                      key={j}
                      className="text-xs rounded-lg p-1 bg-muted text-muted-foreground"
                    >
                      {op}
                    </span>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => removePermission(access)}
                  variant="destructive"
                  size="icon"
                  className="size-5"
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Save Role */}
      <Button
        disabled={addLoading || updateLoading}
        type="submit"
        className="w-full"
        variant="button"
      >
        {addLoading || updateLoading ? <Loader /> : "Save Role"}
      </Button>
    </form>
  );
};

export default EmployeeRoleForm;
