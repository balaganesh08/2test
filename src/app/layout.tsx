import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { AppProviders } from "@/services/AppProviders";

export const metadata: Metadata = {
  title: "GreenFortune",
  description: "Best Upvc windows and doors in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}