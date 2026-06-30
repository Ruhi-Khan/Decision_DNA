import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decision DNA AI — Football Referee & VAR Decisions Explained",
  description:
    "AI-powered referee and VAR decision explanation system using FIFA rules and historical football incidents. Understand WHY football decisions happen.",
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
