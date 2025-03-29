import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
