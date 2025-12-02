import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/AppStoreProvider";

export const metadata: Metadata = {
  title: "Shop App",
  description: "shop app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
