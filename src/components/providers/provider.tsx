import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./query-provider";
import StoreProvider from "@/lib/store/StoreProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <div>
      <ReactQueryProvider>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Toaster />
            <ThemeProvider>{children}</ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </ReactQueryProvider>
    </div>
  );
};

export default Providers;
