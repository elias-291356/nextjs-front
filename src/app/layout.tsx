import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@/shared/styles/globals.css";
import { MainProvider } from "@/shared/styles/providers";
import { ToggleTheme } from "@/shared/styles/components/ui/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "Курс по авторизации",
    template: "%s | Курс по авторизации",
  },
  description:
    "Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          <div className="relative flex min-h-screen flex-col">
            <ToggleTheme />
            <div className="flex h-screen w-full items-center justify-center px-4">
              {children}
            </div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}

