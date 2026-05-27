

interface LiveBadgeProps {
  size?: 'sm' | 'md';
}

export default function LiveBadge({ size = 'md' }: LiveBadgeProps) {
  return (
    <span
      className={`live-badge animate-glow-pulse ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''}`}
    >
      <span className="live-dot" />
      LIVE
    </span>
  );
}