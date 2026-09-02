import { redirect } from "next/navigation";
import { getRandomArchiveHref } from "@/lib/archive";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DoorPage() {
  const href = getRandomArchiveHref();
  redirect(href ?? "/");
}
