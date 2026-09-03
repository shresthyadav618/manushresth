import type { Metadata } from "next";
import MusicProvider from "@/components/music-provider";
import MiniPlayer from "@/components/mini-player";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Manushresth",
    template: "%s · Manushresth",
  },
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
      <body>
        <MusicProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MiniPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
