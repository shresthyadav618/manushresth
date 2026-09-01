import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manushresth",
  description:
    "Thoughts, poems, photographs, things I'm learning, and little pieces of life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}