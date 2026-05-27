
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { MapPin, CalendarDays, LayoutGrid, ArrowRight } from 'lucide-react';
import type { Event } from '@/lib/mock-data';
import { formatDate } from '@/lib/mock-data';

interface EventHeroProps {
  event: Event;
  liveCount: number;
}

export default function EventHero({ event, liveCount }: EventHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[320px] flex flex-col justify-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src={event.coverImage}
          alt="DevConf Paris 2026 conference hall with stage and audience"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/80 to-[#050d1a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        {liveCount > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="live-badge animate-glow-pulse">
              <span className="live-dot" />
              {liveCount} Session{liveCount > 1 ? 's' : ''} Live Now
            </span>
          </div>
        )}

        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
          {event.title}
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-400 mb-8">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} className="text-sky-400" />
            {formatDate(event.startDate)} — {formatDate(event.endDate)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-sky-400" />
            {event.venue}, {event.city}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/multi-track-planning-view" className="btn-primary">
            <LayoutGrid size={16} />
            View Full Planning
          </Link>
          <Link href="/session-detail-page?id=sess-001" className="btn-ghost border border-white/[0.1]">
            Browse Sessions
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}