import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Admin Panel App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
