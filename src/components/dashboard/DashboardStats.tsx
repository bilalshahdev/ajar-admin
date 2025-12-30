import { DashboardStat, Stats } from "@/types";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHandshake, FaMapMarkedAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { MdOutlineRequestPage } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import StatsCard from "../cards/StatsCard";

const DashboardStats = ({ stats }: { stats: Stats }) => {
  const {
    totalUsers,
    totalLeasers,
    totalCategories,
    totalZones,
    bookingCount,
    totalEarning,
  } = stats || ({} as Stats);

  const dashboardStats: DashboardStat[] = [
    {
      title: "Users",
      value: totalUsers,
      icon: HiUsers,
      bgColor: "bg-rose-500",
    },
    {
      title: "Zones",
      value: totalZones,
      icon: FaMapMarkedAlt,
      bgColor: "bg-orange-500",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: BiCategoryAlt,
      bgColor: "bg-pink-500",
    },
    {
      title: "Leasers",
      value: totalLeasers,
      icon: FaHandshake,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Earning",
      value: totalEarning,
      icon: RiMoneyDollarCircleFill,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Bookings",
      value: bookingCount,
      icon: MdOutlineRequestPage,
      bgColor: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardStats?.map(({ title, value, icon: Icon, bgColor }) => (
        <StatsCard
          key={title}
          label={title}
          value={value?.toString()}
          icon={<Icon />}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
