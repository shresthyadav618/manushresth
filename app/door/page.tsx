import { redirect } from "next/navigation";
import { getRandomPublishedHref } from "@/lib/published";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DoorPage() {
  const href = getRandomPublishedHref();
  redirect(href ?? "/");
}
