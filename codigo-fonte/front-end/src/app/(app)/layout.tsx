"use client";

import { CommonBreadcrumbs } from "@/components/template/Breadcrumb";
import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { AuthApp } from "@/utils/providers/AuthApp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthApp>
      <Header />
      <CommonBreadcrumbs />
      <div className="mx-16 my-7">{children}</div>
      <Footer />
    </AuthApp>
  );
}