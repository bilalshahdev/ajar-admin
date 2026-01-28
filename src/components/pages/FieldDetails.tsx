// components/details/field-detail.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/lib/store/hooks";
import { Field } from "@/lib/store/slices/fieldSlice"; // adjust path if different
import { usePathname } from "next/navigation";
import {
  FiAlertCircle,
  FiCheckSquare,
  FiClipboard,
  FiEye,
  FiFlag,
  FiHash,
  FiInfo,
  FiList,
  FiLock,
  FiType,
} from "react-icons/fi";

export default function FieldDetail() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const field: Field | undefined = useAppSelector((s: any) =>
    s.fields.find((f: any) => f._id === id)
  );

  if (!field)
    return (
      <p className="mt-10 text-center text-muted-foreground">
        Field not found.
      </p>
    );

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FiClipboard /> {field.label}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-muted-foreground">
          <FiHash /> {field.name}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            <Detail icon={FiType} label="Type" value={field.type} />
            <Detail
              icon={FiFlag}
              label="Placeholder"
              value={field.placeholder}
            />
            <Detail
              icon={FiHash}
              label="Order"
              value={field.order?.toString()}
            />
            <Detail
              icon={FiEye}
              label="Visible"
              value={String(field.visible)}
            />
            <Detail
              icon={FiLock}
              label="Readonly"
              value={String(field.readonly)}
            />
            <Detail
              icon={FiCheckSquare}
              label="Is Multiple"
              value={String(field.isMultiple)}
            />
            {field.tooltip && (
              <Detail icon={FiInfo} label="Tooltip" value={field.tooltip} />
            )}
            {field.defaultValue !== undefined && (
              <Detail
                icon={FiClipboard}
                label="Default Value"
                value={String(field.defaultValue)}
              />
            )}
            {/* Validation object */}
            {field.validation && (
              <>
                <Detail
                  icon={FiAlertCircle}
                  label="Required"
                  value={String(field.validation.required)}
                />
                {field.validation.pattern && (
                  <Detail
                    icon={FiAlertCircle}
                    label="Pattern"
                    value={field.validation.pattern}
                  />
                )}
                {field.validation.min !== undefined && (
                  <Detail
                    icon={FiAlertCircle}
                    label="Min"
                    value={String(field.validation.min)}
                  />
                )}
                {field.validation.max !== undefined && (
                  <Detail
                    icon={FiAlertCircle}
                    label="Max"
                    value={String(field.validation.max)}
                  />
                )}
              </>
            )}
            {/* Options (for select/multiselect) */}
            {field.options?.length ? (
              <TableRow>
                <TableCell className="font-medium flex gap-2 items-center">
                  <FiList />
                  Options
                </TableCell>
                <TableCell>
                  <ul className="list-disc ml-4 space-y-0.5">
                    {field.options.map((opt) => (
                      <li key={opt}>{opt}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        Field ID: {field._id}
      </CardFooter>
    </Card>
  );
}

/* ---------- helper row ---------- */
function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value?: string;
}) {
  if (value === undefined || value === "") return null;
  return (
    <TableRow>
      <TableCell className="font-medium flex gap-2 items-center">
        <Icon size={14} /> {label}
      </TableCell>
      <TableCell className="truncate">{value}</TableCell>
    </TableRow>
  );
}
