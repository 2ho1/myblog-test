import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { getAllCategories, getAllTags } from "@/lib/posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "편집자의 일상",
  description: "개발과 일상을 기록하는 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen">
              <MobileSidebar categories={categories} tags={tags} />
              <div className="lg:ml-0">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
