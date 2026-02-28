"use client";

import MyImage from "@/components/custom/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBooking } from "@/hooks/useBookings";
import { useTranslations } from "next-intl";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import { TableCell } from "../ui/table";
import { Booking } from "@/types";

type Renter = {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
};

const BookingDetails = ({ id }: { id: string }) => {
    const t = useTranslations("translation");
    const { data, isLoading, error } = useBooking(id);

    if (isLoading) return <Loader />;
    if (error) return <ResponseError error={error.message} />;

    const booking: Booking | undefined = data?.data;
    if (!booking) return null;

    const {
        status,
        renter,
        dates,
        priceDetails,
        pricingMeta,
        extraRequestCharges,
        otp,
        isVerified,
        isExtend,
        paymentStatus,
        createdAt,
    } = booking;

    const statusStyles: Record<string, string> = {
        approved: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
        in_progress: "bg-blue-100 text-blue-700",
        pending: "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {t("bookingDetails")}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                        <span
                            className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {status.replace("_", " ")}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Dates */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <InfoItem
                            label={t("checkIn")}
                            value={new Date(dates.checkIn).toLocaleDateString()}
                        />
                        <InfoItem
                            label={t("checkOut")}
                            value={new Date(dates.checkOut).toLocaleDateString()}
                        />
                        <InfoItem
                            label={t("unit")}
                            value={
                                pricingMeta.unit.charAt(0).toUpperCase() +
                                pricingMeta.unit.slice(1)
                            }
                        />
                        <InfoItem
                            label={t("duration")}
                            value={`${pricingMeta.duration} ${pricingMeta.unit}(s)`}
                        />
                        <InfoItem
                            label={t("isVerified")}
                            value={isVerified ? t("yes") : t("no")}
                        />
                        <InfoItem
                            label={t("isExtend")}
                            value={isExtend ? t("yes") : t("no")}
                        />
                        {otp && <InfoItem label={t("otp")} value={otp} />}
                        {paymentStatus && (
                            <InfoItem label={t("paymentStatus")} value={paymentStatus} />
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Price Details */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl">{t("priceDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <InfoItem
                            label={t("price")}
                            value={`$${priceDetails.price.toFixed(2)}`}
                        />
                        <InfoItem
                            label={t("adminFee")}
                            value={`$${priceDetails.adminFee.toFixed(2)}`}
                        />
                        <InfoItem
                            label={t("tax")}
                            value={`$${priceDetails.tax.toFixed(2)}`}
                        />
                        <InfoItem
                            label={t("additionalCharges")}
                            value={`$${extraRequestCharges.additionalCharges.toFixed(2)}`}
                        />
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {t("totalPrice")}: ${priceDetails.totalPrice.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            {/* Renter Info */}
            {renter && (
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl">{t("renterInformation")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserCard user={renter} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BookingDetails;

const UserCard = ({ user }: { user: Renter }) => (
    <div className="flex items-center gap-4">
        <MyImage
            src={user?.profilePicture || ""}
            alt={user?.name || ""}
            width={60}
            height={60}
            className="w-14 h-14 rounded-full object-cover"
        />
        <div>
            <p className="text-base font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
    </div>
);

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);