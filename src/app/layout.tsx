import SessionProvider from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhotoGram",
  description: "A Photo Sharing Tools for friends and family.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "bg-red-400 text-white p-2 rounded-md flex items-center gap-2",
              success:
                "bg-green-500 text-white p-2 px-4 rounded-md flex items-center gap-2",
            },
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
