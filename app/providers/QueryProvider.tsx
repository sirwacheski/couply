import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

export default function QueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider
    client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}