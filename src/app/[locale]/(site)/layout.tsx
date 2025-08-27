import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <SidebarProvider>
        <AuthProvider>
          <div className="flex w-full min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Navbar />
              <main className="m-4 p-4 rounded-lg bg-background flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </SidebarProvider>
    </SocketProvider>
  );
};

export default SiteLayout;
