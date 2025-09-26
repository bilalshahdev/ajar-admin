"use client";

import MyImage from "@/components/custom/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useRentalListing,
  useUpdateRentalListing,
} from "@/hooks/useRentalListings";
import { User } from "@/types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Loader from "../Loader";
import ResponseError from "../ResponseError";
import Status from "../StatusBadge";
import { Button } from "../ui/button";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";

type ListingDocument = {
  _id: string;
  name: string;
  filesUrl: string[];
};

const RentalListingDetail = ({ id }: { id: string }) => {
  const { data: rentalRequest, isLoading, error } = useRentalListing(id);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRentalListing();

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;

  const {
    name,
    description,
    price,
    images,
    rentalImages,
    createdAt,
    isActive,
    subCategory,
    leaser,
    address,
    status,
    documents,
  }: {
    name?: string;
    description?: string;
    price?: number;
    images?: string[];
    rentalImages?: string[];
    createdAt?: string;
    isActive?: boolean;
    subCategory?: { name?: string; category?: { name?: string } };
    leaser?: User;
    address?: string;
    status?: "pending" | "approved" | "rejected" | string;
    documents?: ListingDocument[];
  } = rentalRequest?.data || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>

          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="font-medium text-muted-foreground">
              {subCategory?.category?.name} / {subCategory?.name}
            </span>
            <span className="text-muted-foreground">
              {new Date(createdAt || "").toLocaleDateString()}
            </span>
            {/* Active/Inactive */}
            <Status value={isActive ? "active" : "inactive"} />
            {/* Request Status (pending/approved/rejected) */}
            {status && <Status value={status} />}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Images */}
          <PhotoProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...(images || []), ...(rentalImages || [])]?.map(
                (image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border shadow hover:shadow-lg cursor-pointer"
                  >
                    <PhotoView src={getImageUrl(image)}>
                      <MyImage
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform"
                      />
                    </PhotoView>
                  </div>
                )
              )}
            </div>
          </PhotoProvider>

          {/* Description */}
          {description && (
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* Common Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <InfoItem label="Location" value={address} />
            <InfoItem label="Status" value={status} />
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-green-600">
            ${price?.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Documents */}
      {Array.isArray(documents) && documents.length > 0 && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">
              Documents{" "}
              <span className="text-sm text-muted-foreground">
                ({documents.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {documents.map((doc) => (
              <div key={doc._id} className="space-y-3">
                <div className="text-base font-medium capitalize">
                  {doc.name?.replaceAll?.("_", " ") || "Document"}
                </div>

                <div className="flex flex-wrap gap-3">
                  {doc.filesUrl?.map((rawUrl, i) => {
                    const url = normalizeSafeUrl(rawUrl);

                    if (!url) return null;

                    if (isImage(url)) {
                      return (
                        <PhotoProvider key={`${doc._id}-${i}`}>
                          <PhotoView src={getImageUrl(url)}>
                            <MyImage
                              width={100}
                              height={100}
                              src={url}
                              alt={`${doc.name}-${i}`}
                              className="h-20 w-20 object-cover rounded border shadow cursor-zoom-in"
                            />
                          </PhotoView>
                        </PhotoProvider>
                      );
                    }

                    // if (isPdf(url)) {
                    //   return (
                    //     <Link
                    //       key={`${doc._id}-${i}`}
                    //       href={getImageUrl(url)}
                    //       target="_blank"
                    //       rel="noreferrer"
                    //       className="text-xs underline"
                    //     >
                    //       View PDF {i + 1}
                    //     </Link>
                    //   );
                    // }

                    // // Fallback link for other file types
                    // return (
                    //   <Link
                    //     key={`${doc._id}-${i}`}
                    //     href={getImageUrl(url)}
                    //     target="_blank"
                    //     rel="noreferrer"
                    //     className="text-xs underline"
                    //   >
                    //     Open file {i + 1}
                    //   </Link>
                    // );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {leaser && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Leaser Information</CardTitle>
          </CardHeader>
          <CardContent>
            <UserCard user={leaser} />
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {status === "pending" && (
        <div className="flex justify-end gap-4">
          <Button
            variant="destructive"
            disabled={isUpdating}
            onClick={() => updateStatus({ id, status: "rejected" })}
          >
            Reject
          </Button>
          <Button
            variant="success"
            disabled={isUpdating}
            onClick={() => updateStatus({ id, status: "approved" })}
          >
            Approve
          </Button>
        </div>
      )}
    </div>
  );
};

export default RentalListingDetail;

const UserCard = ({ user }: { user: User }) => (
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

/** Utils (local to this component) */
const isImage = (u: string) => /\.(png|jpg|jpeg|gif|webp|bmp|svg)$/i.test(u);
const isPdf = (u: string) => /\.pdf$/i.test(u);

/**
 * Normalize and guard against obviously bad URLs (e.g., "www://...").
 * We keep uploads (/uploads/...) and http(s) and data URLs.
 */
function normalizeSafeUrl(u: string) {
  if (!u || typeof u !== "string") return "";
  const trimmed = u.trim();
  const allowed =
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/uploads/") ||
    trimmed.startsWith("data:");
  if (!allowed) return ""; // skip weird schemes like "www://"
  return trimmed;
}
