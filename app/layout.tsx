import { ThemeProvider } from "@teispace/next-themes";
import { getTheme } from "@teispace/next-themes/server";
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Sanjit Dash — Backend Engineer",
    template: "%s",
  },
  description:
    "Backend engineer building reliable systems with Python, FastAPI, and agentic automation.",
  metadataBase: new URL("https://sanjit-dash.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = await getTheme();

  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          initialTheme={initialTheme ?? undefined}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
