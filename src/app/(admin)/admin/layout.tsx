import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
