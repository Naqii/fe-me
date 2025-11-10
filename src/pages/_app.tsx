import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <ToasterProvider>
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            </ToasterProvider>
          </HeroUIProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
