// /components/users/DocumentsTab.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/config/constants";
import { useReviewUserDocuments } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/getImageUrl";
import { safeUrl } from "@/utils/safeUrl";
import Link from "next/link";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "sonner";
import MyImage from "./custom/MyImage";

type Document = {
  _id: string;
  name: string;
  filesUrl: string[];
  expiryDate?: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
};

export default function DocumentsTab({
  userId,
  documents,
}: {
  userId: string;
  documents: Document[];
}) {
  if (!documents?.length) {
    return (
      <div className="text-sm text-muted-foreground">
        No documents uploaded.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="text-sm text-muted-foreground">
        {"Total " + documents?.length}
      </div>
      {documents.map((doc) => (
        <DocumentReviewCard key={doc._id} userId={userId} doc={doc} />
      ))}
    </div>
  );
}

function DocumentReviewCard({
  userId,
  doc,
}: {
  userId: string;
  doc: Document;
}) {
  const { mutate, isPending } = useReviewUserDocuments();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState(doc.reason ?? "");

  const approve = () => {
    mutate({ userId, documentId: doc._id, status: "approved" });
  };

  const reject = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    mutate(
      { userId, documentId: doc._id, status: "rejected", reason },
      { onSuccess: () => setRejectOpen(false) }
    );
  };

  const isImage = (u: string) => /\.(png|jpg|jpeg|gif|webp)$/i.test(u);
  const isPdf = (u: string) => /\.pdf$/i.test(u);

  return (
    <Card
      className={cn(
        "",
        doc.status === "approved"
          ? "bg-aqua/5"
          : doc.status === "rejected"
          ? "bg-red-500/5"
          : "bg-inherit"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base capitalize">
          {doc.name.replaceAll("_", " ")}
        </CardTitle>
        <Badge
          className={cn(
            "h-6 uppercase",
            doc.status === "approved"
              ? "bg-aqua hover:bg-aqua"
              : doc.status === "rejected"
              ? "bg-red-500 hover:bg-red-500"
              : "bg-amber-500 hover:bg-amber-500"
          )}
        >
          {doc.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {doc.expiryDate && (
          <div className="text-xs text-muted-foreground">
            Expiry: {new Date(doc.expiryDate).toLocaleDateString()}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {doc.filesUrl?.map((u, i) => {
            const url = safeUrl(u);
            if (isImage(url)) {
              return (
                <PhotoProvider key={url}>
                  <PhotoView src={getImageUrl(url)}>
                    <MyImage
                      width={100}
                      height={100}
                      src={url}
                      alt={`${doc.name}-${i}`}
                      className="h-20 w-20 object-cover rounded border border-primary shadow "
                    />
                  </PhotoView>
                </PhotoProvider>
              );
            }
            if (isPdf(url)) {
              return (
                <Link
                  key={i}
                  href={baseUrl + url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline"
                >
                  View PDF {i + 1}
                </Link>
              );
            }
          })}
        </div>

        {doc.reason && doc.status === "rejected" && (
          <div className="text-xs text-red-600">Reason: {doc.reason}</div>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Button
          size="sm"
          variant="success"
          onClick={approve}
          disabled={isPending}
        >
          Approve
        </Button>

        <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive" disabled={isPending}>
              Reject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject document</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <label className="text-sm">Reason</label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide a clear reason (e.g., blurry image, expired, mismatched details)"
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={reject}
                disabled={isPending || !reason.trim()}
              >
                Confirm Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
