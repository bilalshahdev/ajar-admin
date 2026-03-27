"use client";

import MyImage from "@/components/custom/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetRefundRequest,
  useUpdateRefundRequest,
} from "@/hooks/useRefundManagement";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import Status from "../StatusBadge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const RefundDetail = ({ id }: { id: string }) => {
  const t = useTranslations("translation");
  const { data: refundResponse, isLoading, error } = useGetRefundRequest(id);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateRefundRequest();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;

  const {
    reason,
    user,
    deduction,
    totalRefundAmount,
    status,
    note,
    createdAt,
  } = refundResponse?.data || {};

  const handleUpdateStatus = (newStatus: "accept" | "reject", adminNote?: string) => {
    updateStatus(
      { id, data: { status: newStatus, adminNote } },
      {
        onSuccess: () => {
          setRejectDialogOpen(false);
          setRejectionNote("");
        },
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Main Detail Card */}
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold">{t("refundRequest")}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <Status value={status} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                {t("totalRefund")}
              </p>
              <p className="text-3xl font-bold text-green-600">
                ${totalRefundAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {/* Reason Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t("reasonForRefund")}</h3>
                {/* Added break-words and whitespace-pre-wrap to fix the note issue */}
                <p className="text-muted-foreground bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border italic break-words whitespace-pre-wrap">
                  &quot;{reason}&quot;
                </p>
              </div>
              
              {note && (
                <div>
                  <h4 className="text-lg font-semibold mb-1">{t("additionalNotes")}</h4>
                  {/* Added break-words to fix the note issue */}
                  <p className="text-sm text-muted-foreground break-words whitespace-pre-wrap">
                    {note}
                  </p>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border h-[155px]">
              <h3 className="text-lg font-semibold text-muted-foreground">
                {t("breakdown")}
              </h3>
              <div className="flex justify-between text-sm">
                <span>{t("deduction")}</span>
                <span className="text-destructive font-medium">-${deduction?.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="font-semibold">{t("finalAmount")}</span>
                <span className="text-xl font-bold">${totalRefundAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information (Reusing your UserCard style) */}
      {user && typeof user === "object" && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">{t("requesterInformation")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <MyImage
                src={user?.profilePicture || ""}
                alt={user?.name || "User"}
                width={256}
                height={256}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="text-base font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions - Same buttons as Rental Details */}
      {status === "pending" && (
        <div className="flex justify-end gap-4 pt-2">
          <Button
            variant="destructive"
            disabled={isUpdating}
            onClick={() => setRejectDialogOpen(true)}
          >
            {t("reject")}
          </Button>
          <Button
            variant="success"
            disabled={isUpdating}
            onClick={() => handleUpdateStatus("accept")}
          >
            {isUpdating ? t("processing") : t("approve")}
          </Button>
        </div>
      )}

      {/* Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("rejectionNote")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Textarea
              id="rejectionNote"
              className="min-h-30" 
              placeholder={t("rejectionNotePlaceholder")}
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectionNote("");
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectionNote.trim() || isUpdating}
              onClick={() => handleUpdateStatus("reject", rejectionNote)}
            >
              {isUpdating ? t("rejecting") : t("confirmReject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefundDetail;