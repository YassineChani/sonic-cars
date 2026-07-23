export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { AdminSettingsClient } from "@/components/admin/AdminSettingsClient";

export const metadata = {
  title: "Paramètres de la Plateforme — SONIC CARS Admin",
};

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <AdminSettingsClient initialSettings={settingsMap} />
    </div>
  );
}
