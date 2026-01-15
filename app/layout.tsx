import "./css/style.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "EnviaUbi",
  description: "Estas invitado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
        >
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
