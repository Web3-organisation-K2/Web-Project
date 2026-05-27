
import Link from 'next/link';
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface PlanningHeaderProps {
  liveCount: number;
  currentDay: number;
  dayLabel: string;
  dayDate: string;
  sessionCount: number;
  onPrevDay: () => void;
  onNextDay: () => void;
}

export default function PlanningHeader({
  liveCount,
  currentDay,
  dayLabel,
  dayDate,
  sessionCount,
  onPrevDay,
  onNextDay,
}: PlanningHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays size={18} className="text-sky-400" />
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Planning</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Multi-Track Schedule</h1>
        <p className="text-slate-400 text-sm mt-1">
          DevConf Paris 2026 — {dayLabel}
          <span className="text-slate-600 ml-2">· {sessionCount} session{sessionCount !== 1 ? 's' : ''}</span>
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {liveCount > 0 && (
          <span className="live-badge animate-glow-pulse">
            <span className="live-dot" />
            {liveCount} Live Now
          </span>
        )}
        <div className="flex items-center gap-1 glass-card px-2 py-1.5">
          <button
            className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous day"
            onClick={onPrevDay}
            disabled={currentDay === 0}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium text-white px-2 min-w-[120px] text-center">{dayDate}</span>
          <button
            className="p-1.5 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next day"
            onClick={onNextDay}
            disabled={currentDay === 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.12] transition-colors"
        >
          <ExternalLink size={13} />
          View All Events
        </Link>
      </div>
    </div>
  );
}
