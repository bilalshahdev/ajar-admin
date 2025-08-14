"use client";

import MyImage from "@/components/custom/MyImage";
import ResponseError from "@/components/ResponseError";
import Status from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetTicket } from "@/hooks/useTickets";
import { format } from "date-fns";
import TicketDetailSkeleton from "../skeletons/TicketSkeleton";

const TicketDetail = ({ id }: { id: string }) => {
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
    booking?.languages.find((lang) => lang.locale === "en")?.translations
      .roomType || booking?.roomType;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          {status && (
            <CardTitle className="text-xl font-semibold flex justify-between items-center">
              Ticket ID: {id}
              <Status value={status!} />
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {booking && (
            <div>
              <h3 className="text-lg font-medium">Booking Details</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Check-In:</span>{" "}
                  {format(new Date(booking.dates.checkIn), "PP")}
                </div>
                <div>
                  <span className="font-medium">Check-Out:</span>{" "}
                  {format(new Date(booking.dates.checkOut), "PP")}
                </div>
                <div>
                  <span className="font-medium">Room Type:</span>{" "}
                  {localeRoomType}
                </div>
                <div>
                  <span className="font-medium">Guests:</span>{" "}
                  {booking.noOfGuests}
                </div>
                <div>
                  <span className="font-medium">Total Price:</span> $
                  {booking.priceDetails.totalPrice}
                </div>
                <div>
                  <span className="font-medium">Extension Charges:</span> $
                  {booking.extensionCharges.totalPrice}
                </div>
              </div>
            </div>
          )}

          {user && (
            <div>
              <h3 className="text-lg font-medium">User Info</h3>
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
            <h3 className="text-lg font-medium">Issue</h3>
            <Separator className="my-2" />
            <div className="text-sm">
              <div>
                <span className="font-medium">Type:</span> {issueType}
              </div>
              <div>
                <span className="font-medium">Details:</span> {rentalText}
              </div>
              <div>
                <span className="font-medium">Additional Fees:</span> $
                {additionalFees}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Meta</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {format(new Date(createdAt!), "PPpp")}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{" "}
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
