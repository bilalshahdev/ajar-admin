import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="m-4 p-4 rounded-lg bg-background flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SiteLayout;
