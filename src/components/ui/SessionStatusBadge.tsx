
import type { SessionStatus } from '@/lib/mock-data';
import LiveBadge from './LiveBadge';

interface SessionStatusBadgeProps {
  status: SessionStatus;
  size?: 'sm' | 'md';
}

export default function SessionStatusBadge({ status, size = 'md' }: SessionStatusBadgeProps) {
  if (status === 'live') return <LiveBadge size={size} />;
  if (status === 'ended') {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-semibold bg-slate-700/40 text-slate-500 border border-slate-700/50 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
        Ended
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
      Upcoming
    </span>
  );
}