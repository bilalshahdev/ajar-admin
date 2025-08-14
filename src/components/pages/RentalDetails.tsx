"use client";

import { RentalRequest } from "@/types";
import { useSelector } from "react-redux";
import { PhotoProvider, PhotoView } from "react-photo-view";
import MyImage from "@/components/custom/MyImage"; // adjust this path if needed
import "react-photo-view/dist/react-photo-view.css";
import Status from "../StatusBadge";
import { Button } from "../ui/button";

const RentalListingDetail = ({ id }: { id: string }) => {
  const rentalRequest: RentalRequest | undefined = useSelector((state: any) =>
    state.rentalRequests.find((request: any) => request._id === id)
  );

  if (!rentalRequest) {
    return (
      <div className="p-6 text-center text-gray-600">
        Rental Request not found.
      </div>
    );
  }

  const {
    name,
    description,
    price,
    images,
    date,
    status,
    subcategory,
    leaser,
    renter,
  } = rentalRequest;

  return (
    <div className="rounded-xl space-y-2">
      <h1 className="text-xl font-semibold">{name}</h1>
      <p className="text-sm text-gray-500">{new Date(date).toLocaleString()}</p>

      <div className="space-y-2">
        <p className="text-base">{description}</p>
        <p className="text-lg font-medium">Price: ${price.toFixed(2)}</p>
        <p className="text-sm">
          Category:{" "}
          <span className="font-medium">
            {subcategory.category.name} / {subcategory.name}
          </span>
        </p>
        <p className="text-sm">
          Status: <Status value={status} />
        </p>
      </div>

      {/* Images Gallery */}
      <PhotoProvider>
        <div className="flex flex-wrap gap-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 md:w-40 md:h-40 overflow-hidden border rounded-lg shadow hover:shadow-lg cursor-pointer transition-all duration-300"
            >
              <PhotoView src={image}>
                <MyImage
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-300"
                />
              </PhotoView>
            </div>
          ))}
        </div>
      </PhotoProvider>

      {/* Leaser & Renter Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <User user={leaser} role="Leaser" />
        <User user={renter} role="Renter" />
      </div>

      {status === "pending" && (
        <div className="flex justify-end gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => {
              // handle reject
            }}
          >
            Reject
          </Button>
          <Button
            variant="button"
            onClick={() => {
              // handle approve
            }}
          >
            Approve
          </Button>
        </div>
      )}
    </div>
  );
};

export default RentalListingDetail;

const User = ({ user, role }: { user: any; role: string }) => {
  return (
    <div className="flex items-center gap-4">
      <MyImage
        src={user.profilePic}
        alt={user.name}
        width={60}
        height={60}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-base font-medium">{user.name}</p>
      </div>
    </div>
  );
};
