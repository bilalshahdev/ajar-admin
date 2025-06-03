"use client";
import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./query-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
    </div>
  );
};

export default Providers;
