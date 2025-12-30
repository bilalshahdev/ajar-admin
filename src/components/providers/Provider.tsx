import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ReactQueryProvider from "@/components/providers/QueryProvider";
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