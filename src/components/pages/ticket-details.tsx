"use client";

import { useSelector } from "react-redux";
import { Ticket } from "@/types";
import MyImage from "@/components/custom/my-image";
import Status from "@/components/status-badge";

const TicketDetail = ({ id }: { id: string }) => {
  const ticket: Ticket | undefined = useSelector((state: any) =>
    state.tickets.find((t: Ticket) => t._id === id)
  );

  if (!ticket) {
    return (
      <div className="p-6 text-center text-gray-600">Ticket not found.</div>
    );
  }

  const {
    _id,
    sender,
    email,
    subject,
    description,
    createdAt,
    status,
    group,
    assignedTo,
    priority,
    response,
    complainant,
  } = ticket;

  return (
    <div className="rounded-xl space-y-4">
      <h1 className="text-xl font-semibold">Request Id #{_id}</h1>

      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Request Status: </span>
          <Status value={status} />
        </div>
        {group && (
          <div>
            <span className="font-medium">Group: </span>
            {group}
          </div>
        )}
        {assignedTo && (
          <div>
            <span className="font-medium">Assign to: </span>
            {assignedTo}
          </div>
        )}
        {priority && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Set Priority:</span>
            <span
              className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                priority === "High"
                  ? "bg-red-500 text-white"
                  : priority === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {priority}
            </span>
          </div>
        )}
        {response && (
          <div>
            <span className="font-medium">Response (if any): </span>
            {response}
          </div>
        )}
        <div>
          <span className="font-medium">Subject: </span>
          {subject}
        </div>
        {description && (
          <div>
            <span className="font-medium">Description: </span>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-sm text-gray-500 mb-1">Complained By</h3>
        <div className="flex items-center gap-4">
          <MyImage
            src={complainant?.profilePic ?? "/images/dummy/renter.avif"}
            alt={complainant?.name ?? "Unknown"}
            width={60}
            height={60}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-medium">
              {complainant?.name ?? "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              Date of Complaint: {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
