"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface StatusCardProps {
  status: "approved" | "rejected" | "pending";
  title?: string;

  approve: () => void;
  reject: (reason?: string) => void;
  isPending?: boolean;

  /** if true → ask for reason before rejecting */
  requireReason?: boolean;

  /** main body content (files, info, etc.) */
  children?: React.ReactNode;
}

export const StatusCard = ({
  status,
  title = "Status",
  approve,
  reject,
  isPending,
  requireReason = true,
  children,
}: StatusCardProps) => {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  const statusColors = {
    approved: {
      bg: "bg-aqua/5",
      badge: "bg-aqua hover:bg-aqua",
    },
    rejected: {
      bg: "bg-red-500/5",
      badge: "bg-red-500 hover:bg-red-500",
    },
    pending: {
      bg: "bg-inherit",
      badge: "bg-amber-500 hover:bg-amber-500",
    },
  };

  const { bg, badge } = statusColors[status] || statusColors.pending;

  return (
    <Card className={cn(bg)}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base capitalize">{title}</CardTitle>
        <Badge className={cn("h-6 uppercase", badge)}>{status}</Badge>
      </CardHeader>

      {/* Body (flexible via children) */}
      <CardContent className="space-y-3">{children}</CardContent>

      {/* Footer (Approve / Reject actions) */}
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

            {requireReason && (
              <div className="space-y-2">
                <label className="text-sm">Reason</label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a clear reason (e.g., blurry image, expired, mismatched details)"
                  rows={4}
                />
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  reject(requireReason ? reason : undefined);
                  setRejectOpen(false);
                  setReason("");
                }}
                disabled={isPending || (requireReason && !reason.trim())}
              >
                Confirm Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
