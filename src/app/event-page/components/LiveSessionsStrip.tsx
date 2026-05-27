
import Link from 'next/link';
import SpeakerAvatar from '@/components/ui/SpeakerAvatar';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import type { Session } from '@/lib/mock-data';
import { formatTime } from '@/lib/mock-data';

interface LiveSessionsStripProps {
  sessions: Session[];
}

export default function LiveSessionsStrip({ sessions }: LiveSessionsStripProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="live-dot w-2.5 h-2.5" />
        <h2 className="font-display text-lg font-bold text-white">Happening Now</h2>
        <span className="text-xs text-slate-500 ml-auto">
          {sessions.length} session{sessions.length > 1 ? 's' : ''} in progress
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-2">
        {sessions.map((session) => (
          <Link
            key={`live-strip-${session.id}`}
            href={`/session-detail-page?id=${session.id}`}
            className="glass-card-live flex-shrink-0 w-80 p-5 block hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="live-badge animate-glow-pulse">
                <span className="live-dot" />
                LIVE
              </span>
              <span className="room-tag">
                <MapPin size={10} />
                {session.room.name}
              </span>
            </div>

            <h3 className="font-display text-sm font-semibold text-white leading-snug mb-3 line-clamp-2">
              {session.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {session.speakers.slice(0, 3).map((sp, idx) => (
                  <div key={`live-spk-${session.id}-${sp.id}`} style={{ marginLeft: idx > 0 ? -8 : 0 }}>
                    <SpeakerAvatar name={sp.name} photo={sp.photo} size={28} />
                  </div>
                ))}
                {session.speakers.length > 0 && (
                  <span className="text-xs text-slate-400 ml-2">{session.speakers[0].name}</span>
                )}
              </div>
              <span className="time-chip">
                <Clock size={11} />
                {formatTime(session.startTime)} – {formatTime(session.endTime)}
              </span>
            </div>

            {session.questions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-emerald-400">{session.questions.length} questions live</span>
                <ArrowRight size={13} className="text-slate-500" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}