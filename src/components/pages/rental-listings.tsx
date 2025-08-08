"use client";
import RentalList from "@/components/rental-list";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import StatsCard from "../cards/stats-card";

const RentalListings = () => {
  const rentalRequests = useSelector(
    (state: RootState) => state.rentalRequests
  );

  const RentalStats = [
    {
      title: "Rental requests ",
      value: rentalRequests.length.toString(),
      change: 0,
    },
    {
      title: "Approved requests",
      value: rentalRequests
        .filter((request) => request.status === "approved")
        .length.toString(),
      change: 0,
    },
    {
      title: "Rejected requests",
      value: rentalRequests
        .filter((request) => request.status === "rejected")
        .length.toString(),
      change: 0,
    },
    {
      title: "Completed requests",
      value: rentalRequests
        .filter((request) => request.status === "completed")
        .length.toString(),
      change: 0,
    },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RentalStats.map((data) => (
          <StatsCard key={data.title} {...data} />
        ))}
      </div>
      <RentalList requests={rentalRequests} />
    </div>
  );
};

export default RentalListings;
