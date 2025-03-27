import BarChart from "@/components/dashboard/bar-chart";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import LineChart from "@/components/dashboard/line-chart";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LineChart />
        <BarChart />
      </div>
    </div>
  );
}
