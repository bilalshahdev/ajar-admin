type BookingStatus =
  | "pending"
  | "approved"
  | "in_progress"
  | "rejected"
  | "completed"
  | "request_cancelled"
  | "booking_cancelled"
  | "expired";

const statusStyleMap: Record<BookingStatus, string> = {
  approved:            "bg-green-100 text-green-700",
  in_progress:         "bg-blue-100 text-blue-700",
  completed:           "bg-teal-100 text-teal-700",
  pending:             "bg-yellow-100 text-yellow-700",
  rejected:            "bg-red-100 text-red-700",
  request_cancelled:   "bg-red-100 text-red-700",
  booking_cancelled:   "bg-red-100 text-red-700",
  expired:             "bg-gray-100 text-gray-700",
};

export const getStatusStyle = (status: BookingStatus): string => {
  return statusStyleMap[status] ?? "bg-yellow-100 text-yellow-700";
};

export const formatStatus = (status: BookingStatus): string => {
  return status.replace(/_/g, " ");
};