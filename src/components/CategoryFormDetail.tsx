"use client";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useAppSelector } from "@/lib/store/hooks";

export default function CategoryFormDetail({
  categoryId,
}: {
  categoryId: string;
}) {
  const form = useAppSelector((s: any) =>
    s.forms.find((f: any) => f.categoryId === categoryId)
  );
  const fields = useAppSelector((s: any) => s.fields);

  if (!form) return <p>No form configured for this category.</p>;

  const attached = fields.filter((f: any) => form.fields.includes(f._id));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{form.name}</h2>
      {form.description && (
        <p className="text-muted-foreground">{form.description}</p>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attached.map((f: any, idx: number) => (
            <TableRow key={f._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{f.label}</TableCell>
              <TableCell className="capitalize">{f.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
