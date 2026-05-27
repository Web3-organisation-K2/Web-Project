
import { Presentation, Radio, Users, DoorOpen } from 'lucide-react';

interface EventStatsProps {
  totalSessions: number;
  liveSessions: number;
  totalSpeakers: number;
  totalRooms: number;
}

const STAT_CONFIGS = [
  {
    key: 'sessions',
    icon: Presentation,
    label: 'Total Sessions',
    color: 'sky',
    gradient: 'from-sky-500/20 to-sky-500/5',
    border: 'border-sky-500/20',
    iconColor: 'text-sky-400',
  },
  {
    key: 'live',
    icon: Radio,
    label: 'Live Right Now',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    pulse: true,
  },
  {
    key: 'speakers',
    icon: Users,
    label: 'Speakers',
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    key: 'rooms',
    icon: DoorOpen,
    label: 'Rooms & Tracks',
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
];

export default function EventStats({ totalSessions, liveSessions, totalSpeakers, totalRooms }: EventStatsProps) {
  const values: Record<string, number> = {
    sessions: totalSessions,
    live: liveSessions,
    speakers: totalSpeakers,
    rooms: totalRooms,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STAT_CONFIGS.map((cfg) => {
        const Icon = cfg.icon;
        return (
          <div
            key={`stat-${cfg.key}`}
            className={`glass-card p-5 bg-gradient-to-br ${cfg.gradient} border ${cfg.border}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-white/[0.06] ${cfg.iconColor}`}>
                <Icon size={18} />
              </div>
              {cfg.pulse && values[cfg.key] > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>
            <p className="font-display text-3xl font-bold text-white tabular-nums mb-1">
              {values[cfg.key]}
            </p>
            <p className="text-xs font-medium text-slate-400 tracking-wide">{cfg.label}</p>
          </div>
        );
      })}
    </div>
  );
}