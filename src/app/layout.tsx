import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const siteUrl = "https://tools.harshsandhu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tools — Developer utilities that respect your data",
    template: "%s | Tools",
  },
  description:
    "Fast, focused developer utilities that run entirely in your browser. No account, no uploads, no tracking.",
  openGraph: {
    title: "Tools — Developer utilities that respect your data",
    description:
      "Fast, focused developer utilities that run entirely in your browser. No account, no uploads, no tracking.",
    url: siteUrl,
    siteName: "Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools — Developer utilities that respect your data",
    description:
      "Fast, focused developer utilities that run entirely in your browser. No account, no uploads, no tracking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
