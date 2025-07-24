import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"], // Specify the subset you need
  weight: ["400", "500", "700"], // Specify the weights you plan to use
  variable: "--font-dm-sans", // Define a CSS variable for Tailwind
  display: "swap", // Ensures text remains visible during font loading
});

export const metadata: Metadata = {
  title: "Code Fable AI",
  description:
    "Where Every Line of Code Tells a Story, in Your Language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        {children}
        </body>
    </html>
  );
}
