// app/admin/layout.tsx — shared shell for all /admin/* pages
import { redirect } from "next/navigation";
import { Anton, Inter } from "next/font/google";
import { requireAdmin } from "@/lib/auth/session";
import AdminSidebar from "@/components/admin/AdminSidebar";

// NOTE: if the rest of the site also uses Anton/Inter, consider hoisting this
// to the root app/layout.tsx instead so the font is only loaded once.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    redirect("/account");
  }

  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="grid md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
