import WanderLink from "@/components/wander-link";

export default function SecretInvite({ hrefs }: { hrefs: string[] }) {
  return (
    <p className="secret-invite">
      <WanderLink hrefs={hrefs} className="secret-link">
        I don&apos;t know why I wrote this. →
      </WanderLink>
    </p>
  );
}
