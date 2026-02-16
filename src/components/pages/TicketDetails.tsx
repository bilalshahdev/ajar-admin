"use client";

import MyImage from "@/components/custom/MyImage";
import ResponseError from "@/components/ResponseError";
import Status from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetTicket } from "@/hooks/useTickets";
import { format } from "date-fns";
import TicketDetailSkeleton from "../skeletons/TicketSkeleton";
import { useTranslations } from "next-intl";

const TicketDetail = ({ id }: { id: string }) => {
  const t = useTranslations();
  const { data, isLoading, error } = useGetTicket(id, true);
  const ticket = data?.data;

  if (isLoading) {
    return <TicketDetailSkeleton />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  const {
    booking,
    user,
    rentalText,
    issueType,
    additionalFees,
    attachments,
    status,
    createdAt,
    updatedAt,
  } = ticket || {};

  const localeRoomType =
    booking?.languages?.find((lang) => lang.locale === "en")?.translations
      .roomType || booking?.roomType;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          {status && (
            <CardTitle className="text-xl font-semibold flex justify-between items-center">
              {t("translation.tickets")} ID: {id}
              <Status value={t("status." + status.toLowerCase())} />
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {booking && (
            <div>
              <h3 className="text-lg font-medium">{t("translation.bookingDetails")}</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">{t("translation.checkIn")}:</span>{" "}
                  {format(new Date(booking.dates.checkIn), "PP")}
                </div>
                <div>
                  <span className="font-medium">{t("translation.checkOut")}:</span>{" "}
                  {format(new Date(booking.dates.checkOut), "PP")}
                </div>
                <div>
                  <span className="font-medium">{t("translation.category")}:</span>{" "}
                  {localeRoomType}
                </div>
                <div>
                  <span className="font-medium">{t("translation.users")}:</span>{" "}
                  {booking.noOfGuests}
                </div>
                <div>
                  <span className="font-medium">{t("translation.totalEarnings")}:</span> $
                  {booking?.priceDetails?.totalPrice}
                </div>
                <div>
                  <span className="font-medium">{t("translation.totalEarning")}:</span> $
                  {booking?.extensionCharges?.totalPrice}
                </div>
              </div>
            </div>
          )}

          {user && (
            <div>
              <h3 className="text-lg font-medium">{t("translation.userInfo")}</h3>
              <Separator className="my-2" />
              <div className="flex items-center gap-4">
                <MyImage
                  src={user?.profilePicture || ""}
                  width={50}
                  height={50}
                  alt="Profile"
                  className="rounded-full w-14 h-14 object-cover"
                />
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                  <div className="text-muted-foreground">{user.phone}</div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium">{t("translation.issue")}</h3>
            <Separator className="my-2" />
            <div className="text-sm">
              <div>
                <span className="font-medium">{t("translation.type")}:</span> {issueType}
              </div>
              <div>
                <span className="font-medium">{t("translation.details")}:</span> {rentalText}
              </div>
              <div>
                <span className="font-medium">{t("translation.refundIssued")}:</span> $
                {additionalFees}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">{t("translation.administration")}</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">{t("translation.created")}:</span>{" "}
                {format(new Date(createdAt!), "PPpp")}
              </div>
              <div>
                <span className="font-medium">{t("translation.updated")}:</span>{" "}
                {format(new Date(updatedAt!), "PPpp")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetail;