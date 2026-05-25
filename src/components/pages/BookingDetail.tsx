"use client";

import MyImage from "@/components/custom/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBooking } from "@/hooks/useBookings";
import { useTranslations } from "next-intl";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Booking } from "@/types";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatBookingDate } from "@/utils/formatBookingDate";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";

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
        bookingDates,
        extensions,
    } = booking;

    const statusStyles: Record<string, string> = {
        approved: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
        in_progress: "bg-blue-100 text-blue-700",
        pending: "bg-yellow-100 text-yellow-700",
    };

    const securityDeposit = priceDetails.securityDeposit || 0;
    const bookingTotal = priceDetails.totalPrice + securityDeposit;
    const extensionsTotal = extensions.reduce((total, extension) => {
        const extensionPrice = extension.priceDetails;
        return total + (extensionPrice?.totalPrice || 0) + (extensionPrice?.securityDeposit || 0);
    }, 0);
    const payableTotal = bookingTotal + extensionsTotal;

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
                    {/* Booking summary */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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

            <BookingTimeline
                checkIn={dates.checkIn}
                checkOut={dates.checkOut}
                handover={bookingDates?.handover}
                returnDate={bookingDates?.returnDate}
                unit={pricingMeta.unit}
                extensions={extensions}
            />

            <PaymentSummary
                t={t}
                priceDetails={priceDetails}
                extraRequestCharges={extraRequestCharges}
                pricingMeta={pricingMeta}
                extensions={extensions}
                bookingTotal={bookingTotal}
                extensionsTotal={extensionsTotal}
                payableTotal={payableTotal}
            />

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

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const PaymentSummary = ({
    t,
    priceDetails,
    extraRequestCharges,
    pricingMeta,
    extensions,
    bookingTotal,
    extensionsTotal,
    payableTotal,
}: {
    t: ReturnType<typeof useTranslations>;
    priceDetails: Booking["priceDetails"];
    extraRequestCharges: Booking["extraRequestCharges"];
    pricingMeta: Booking["pricingMeta"];
    extensions: Booking["extensions"];
    bookingTotal: number;
    extensionsTotal: number;
    payableTotal: number;
}) => {
    const securityDeposit = priceDetails.securityDeposit || 0;
    const additionalCharges = extraRequestCharges.additionalCharges || 0;

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl">{t("priceDetails")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="rounded-md border bg-muted/30 p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Amount to collect
                    </p>
                    <p className="mt-1 text-3xl font-bold text-green-600">
                        {formatCurrency(payableTotal)}
                    </p>
                    <div className="mt-4 space-y-2 border-t pt-4">
                        <PriceRow label="Booking total" value={bookingTotal} strong />
                        {extensionsTotal > 0 && (
                            <PriceRow label="Extensions total" value={extensionsTotal} strong />
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <p className="font-semibold">Booking charges</p>
                        <div className="space-y-2 rounded-md border p-4">
                            <PriceRow
                                label={`${t("price")} (${pricingMeta.duration} ${pricingMeta.unit})`}
                                value={priceDetails.price}
                            />
                            <PriceRow label={t("adminFee")} value={priceDetails.adminFee} />
                            <PriceRow label={t("tax")} value={priceDetails.tax} />
                            {additionalCharges > 0 && (
                                <PriceRow
                                    label={t("additionalCharges")}
                                    value={additionalCharges}
                                />
                            )}
                            {securityDeposit > 0 && (
                                <PriceRow label={t("securityDeposit")} value={securityDeposit} />
                            )}
                            <div className="border-t pt-2">
                                <PriceRow label="Booking total" value={bookingTotal} strong />
                            </div>
                        </div>
                    </div>

                    {extensions.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-semibold">Extension charges</p>
                            <div className="space-y-3">
                                {extensions.map((extension, index) => {
                                    const extensionPrice = extension.priceDetails;
                                    const extensionDeposit =
                                        extensionPrice?.securityDeposit || 0;
                                    const extensionAdditionalCharges =
                                        extension.extraRequestCharges?.additionalCharges || 0;
                                    const extensionTotal =
                                        (extensionPrice?.totalPrice || 0) + extensionDeposit;

                                    return (
                                        <div
                                            key={extension._id || index}
                                            className="space-y-2 rounded-md border p-4"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-medium">
                                                        {extension.name ||
                                                            `Extension ${index + 1}`}
                                                    </p>
                                                    {extension.extensionDate && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatBookingDate(
                                                                extension.extensionDate,
                                                                extension.pricingMeta?.unit ||
                                                                pricingMeta.unit
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="font-semibold text-green-600">
                                                    {formatCurrency(extensionTotal)}
                                                </p>
                                            </div>
                                            <PriceRow
                                                label={`${t("price")} (${extension.pricingMeta?.duration || 0} ${extension.pricingMeta?.unit || pricingMeta.unit})`}
                                                value={extensionPrice?.price || 0}
                                            />
                                            {(extensionPrice?.adminFee || 0) > 0 && (
                                                <PriceRow
                                                    label={t("adminFee")}
                                                    value={extensionPrice?.adminFee || 0}
                                                />
                                            )}
                                            {(extensionPrice?.tax || 0) > 0 && (
                                                <PriceRow
                                                    label={t("tax")}
                                                    value={extensionPrice?.tax || 0}
                                                />
                                            )}
                                            {extensionAdditionalCharges > 0 && (
                                                <PriceRow
                                                    label={t("additionalCharges")}
                                                    value={extensionAdditionalCharges}
                                                />
                                            )}
                                            {extensionDeposit > 0 && (
                                                <PriceRow
                                                    label={t("securityDeposit")}
                                                    value={extensionDeposit}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const PriceRow = ({
    label,
    value,
    strong = false,
}: {
    label: string;
    value: number;
    strong?: boolean;
}) => (
    <div
        className={`flex items-center justify-between gap-4 text-sm ${strong ? "font-semibold" : ""
            }`}
    >
        <span className="text-muted-foreground">{label}</span>
        <span className="shrink-0">{formatCurrency(value)}</span>
    </div>
);

const BookingTimeline = ({
    checkIn,
    checkOut,
    handover,
    returnDate,
    unit,
    extensions = [],
}: {
    checkIn: string;
    checkOut: string;
    handover?: string | null;
    returnDate?: string | null;
    unit: Booking["pricingMeta"]["unit"];
    extensions?: Booking["extensions"];
}) => {
    type TimelineItem = {
        key: string;
        label: string;
        date: string;
        completed: boolean;
        badge?: string | null;
    };

    const extensionReturnDate = [...extensions]
        .reverse()
        .find((extension) => extension?.returnDate)?.returnDate;
    const completedReturnDate = extensionReturnDate || returnDate;

    const timelineItems: TimelineItem[] = [
        {
            key: "check-in",
            label: "Check-In",
            date: checkIn,
            completed: true,
        },
        {
            key: "check-out",
            label: "Check-Out",
            date: checkOut,
            completed: Boolean(handover),
        },
        ...(handover
            ? [
                {
                    key: "handover",
                    label: "Handover Completed",
                    date: handover,
                    completed: true,
                },
            ]
            : []),
        ...extensions
            .filter((extension) => extension?.extensionDate)
            .map((extension, index) => ({
                key: extension._id || `extension-${index}`,
                label: extension.name || `Extension ${index + 1}`,
                date: extension.extensionDate as string,
                completed: true,
                badge: extension.paymentStatus || "Approved",
            })),
        ...(completedReturnDate
            ? [
                {
                    key: "return-completed",
                    label: "Return Completed",
                    date: completedReturnDate,
                    completed: true,
                },
            ]
            : []),
    ];

    if (!timelineItems.length) return null;

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    Timeline
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative grid gap-6 md:grid-cols-5">
                    <div className="absolute left-3 right-3 top-3 hidden border-t md:block" />
                    {timelineItems.map((item) => (
                        <div key={item.key} className="relative space-y-3">
                            <div className="relative z-10 bg-card pr-2 md:inline-flex">
                                {item.completed ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : (
                                    <Circle className="h-6 w-6 text-muted-foreground/40" />
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    {item.label}
                                </p>
                                <p className="text-sm font-semibold">
                                    {formatBookingDate(item.date, unit)}
                                </p>
                                {item.badge && (
                                    <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const UserCard = ({ user }: { user: Renter }) => (
    <div className="flex items-center gap-4">
        <PhotoProvider>
            <PhotoView src={getImageUrl(user?.profilePicture || "")}>
                <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                    <MyImage
                        src={user?.profilePicture || ""}
                        alt={user?.name || ""}
                        width={256}
                        height={256}
                        className="w-14 h-14 rounded-full object-cover border shadow-sm"
                    />
                </div>
            </PhotoView>
        </PhotoProvider>
        <div>
            <p className="text-base font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
    </div>
);

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
    <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);
