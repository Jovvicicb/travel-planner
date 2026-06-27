import { ShareCard } from "./ShareCard";

export function ShareList({ shares, deactivating, onCopy, onDeactivate }) {
  return (
    <div className="grid gap-4">
      {shares.map((share) => (
        <ShareCard
          key={share.id}
          share={share}
          deactivating={deactivating}
          onCopy={onCopy}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  );
}
