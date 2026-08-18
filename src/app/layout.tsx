import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./globals.scss";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`h-full antialiased`}
    >
      <body className={`${geistSans.variable} min-h-full flex flex-col`}>
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
