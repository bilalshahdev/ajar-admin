import { DashboardStat } from "@/types";
import { HiMiniCursorArrowRipple, HiUsers } from "react-icons/hi2";
import { IoMdCart } from "react-icons/io";

import { RiFileList2Fill } from "react-icons/ri";

const DashboardStats = () => {
  const dashboardStats: DashboardStat[] = [
    {
      title: "Total Ads",
      value: 486,
      icon: RiFileList2Fill,
      bgColor: "bg-rose-500",
    },
    {
      title: "Paid Ads",
      value: 14,
      icon: RiFileList2Fill,
      bgColor: "bg-orange-500",
    },
    {
      title: "Free Ads",
      value: 43,
      icon: RiFileList2Fill,
      bgColor: "bg-pink-500",
    },
    {
      title: "Total Users",
      value: 57,
      icon: HiUsers,
      bgColor: "bg-blue-500",
    },
    {
      title: "Admin Users",
      value: 2,
      icon: HiUsers,
      bgColor: "bg-blue-500",
    },
    {
      title: "Web Users",
      value: 21,
      icon: HiUsers,
      bgColor: "bg-blue-500",
    },
    {
      title: "Total Exchange to Buy Post",
      value: 56,
      icon: IoMdCart,
      bgColor: "bg-rose-500",
    },
    {
      title: "Total Instant Buy Post",
      value: 42,
      icon: HiMiniCursorArrowRipple,
      bgColor: "bg-orange-500",
    },
    {
      title: "Total Given Away Post",
      value: 42,
      icon: HiMiniCursorArrowRipple,
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardStats.map((stat) => (
        <div
          key={stat.title}
          className={`p-4 rounded-lg bg-background shadow flex items-center justify-between`}
        >
          <div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <h3 className="text-lg font-semibold">{stat.value}</h3>
          </div>
          <div className={`p-4 rounded-full text-white ${stat.bgColor}`}>
            <stat.icon size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
