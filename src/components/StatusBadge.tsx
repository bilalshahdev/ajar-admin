import clsx from "clsx";

type Status =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "active"
  | "inactive"
  | string;

interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: Status;
}

const getStatusColor = (value: Status) => {
  switch (value?.toLowerCase()) {
    case "pending":
      return "bg-yellow-500 text-white";
    case "approved":
    case "active":
      return "bg-green-600 text-white";
    case "rejected":
    case "blocked":
      return "bg-red-500 text-white";
    case "completed":
      return "bg-blue-600 text-white";
    case "inactive":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const Status: React.FC<StatusProps> = ({ value, className, ...props }) => {
  return (
    <span
      {...props}
      className={clsx(
        "px-2 py-0.5 text-xs rounded-full capitalize font-medium",
        getStatusColor(value),
        className
      )}
    >
      {value}
    </span>
  );
};

export default Status;
