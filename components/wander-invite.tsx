import WanderLink from "@/components/wander-link";

export default function WanderInvite({ hrefs }: { hrefs: string[] }) {
  return (
    <div className="wander-invite">
      <p className="display wander-question">
        Don&apos;t know what you&apos;re looking for?
      </p>
      <p className="wander-aside">That&apos;s probably okay.</p>
      <WanderLink hrefs={hrefs} />
    </div>
  );
}
