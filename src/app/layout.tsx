import { Header } from "@/components/Header/Header";
import { AllProviders } from "@/providers/Index";
import "@/styles/globals.scss";
import clsx from "clsx";
import type { Metadata } from "next";
import { Darumadrop_One, Poppins } from "next/font/google";

const displayFont = Darumadrop_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});
const sansSerifFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-serif",
});

export const metadata: Metadata = {
  title: "Pizza Forecast",
  description: "When's good to cook pizza?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(displayFont.variable, sansSerifFont.variable)}
    >
      <body>
        <Header />
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
