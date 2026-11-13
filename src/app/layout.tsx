import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ar13.dev"),
  title: {
    default: "Ari Shah",
    template: "%s · Ari Shah",
  },
  description:
    "Ari Shah. Computer Science at UCF, interested in product engineering and applied AI.",
  openGraph: {
    title: "Ari Shah",
    description:
      "Computer Science at UCF, interested in product engineering and applied AI.",
    url: "https://ar13.dev",
    siteName: "Ari Shah",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ar1shah",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1eb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
