"use client";
import StoreProvider from "@/redux/storeProvider";
import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./query-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ReactQueryProvider>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </div>
  );
};

export default Providers;
