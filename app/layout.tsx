import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarNav } from "@/components/sidebar-nav";

// Font configurations
const roboto = Roboto({ variable: "--font-roboto", weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taj Gillin",
  description: "Taj Gillin's personal website.",
  icons: {
    icon: '/mahal.png',
    shortcut: '/mahal.png',
    apple: '/mahal.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-P2LCFGRG" />
      <body
        className={`${roboto.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarNav />
          <div className="h-screen w-full overflow-hidden relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
