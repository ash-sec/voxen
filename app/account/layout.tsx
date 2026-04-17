import { redirect } from "next/navigation";
import { getSessionSubscriber } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscriber = await getSessionSubscriber();

  if (!subscriber) {
    redirect("/login");
  }

  return <DashboardShell subscriber={subscriber}>{children}</DashboardShell>;
}
