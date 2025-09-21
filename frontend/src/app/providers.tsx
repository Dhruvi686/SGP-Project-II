'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/Authcontextapi";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </Provider>
    </SessionProvider>
  );
}
