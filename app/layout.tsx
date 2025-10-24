import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PayPal Advance",
  description:
    "Unlock flexible working capital with PayPal Advance. Explore funding estimates, repayment details, and FAQs.",
  metadataBase: new URL("https://www.paypal.com"),
  openGraph: {
    title: "PayPal Advance",
    description:
      "Flexible, transparent financing designed for growing businesses.",
    url: "https://www.paypal.com/bizsolutions/advance",
    siteName: "PayPal Advance",
    images: [
      {
        url: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
        width: 258,
        height: 258,
        alt: "PayPal logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayPal Advance",
    description:
      "Unlock tomorrow's revenue today with transparent PayPal Advance financing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
