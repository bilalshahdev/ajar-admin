"use client";
import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./query-provider";
import StoreProvider from "@/lib/store/StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ReactQueryProvider>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </ReactQueryProvider>
    </div>
  );
};

export default Providers;
