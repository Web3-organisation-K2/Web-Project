'use client';
import  { useState } from 'react';
import Link from 'next/link';
import SessionStatusBadge from '@/components/ui/SessionStatusBadge';
import { Clock, MapPin, Users, Star, Share2, ChevronLeft } from 'lucide-react';
import type { Session, SessionStatus } from '@/lib/mock-data';
import { formatTime } from '@/lib/mock-data';
import { toast } from 'sonner';

interface SessionDetailHeroProps {
  session: Session;
  status: SessionStatus;
}

export default function SessionDetailHero({ session, status }: SessionDetailHeroProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Session link copied to clipboard');
  };

  return (
    <div className={`glass-card p-6 md:p-8 relative overflow-hidden ${status === 'live' ? 'glass-card-live' : ''}`}>
      {/* Ambient glow for live */}
      {status === 'live' && (
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/[0.07] blur-3xl pointer-events-none" />
      )}

      {/* Back nav */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/event-page" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors">
          <ChevronLeft size={14} />
          DevConf Paris 2026
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-400 truncate">{session.room.name}</span>
      </div>

      {/* Status + room */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <SessionStatusBadge status={status} />
        <span className="room-tag">
          <MapPin size={11} />
          {session.room.name}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {session.track}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
        {session.title}
      </h1>

      {/* Description */}
      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
        {session.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-400 mb-6 pb-6 border-b border-white/[0.07]">
        <span className="flex items-center gap-2">
          <Clock size={14} className="text-sky-400" />
          <span className="font-mono tabular-nums">
            {formatTime(session.startTime)} – {formatTime(session.endTime)}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={14} className="text-sky-400" />
          {session.room.name}
        </span>
        <span className="flex items-center gap-2">
          <Users size={14} className="text-sky-400" />
          {session.capacity} seat capacity
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {session.tags.map((tag) => (
          <span key={`detail-tag-${tag}`} className="text-xs px-3 py-1 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.07]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
            isFavorite
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' :'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20'
          }`}
        >
          <Star size={15} fill={isFavorite ? 'currentColor' : 'none'} />
          {isFavorite ? 'Saved' : 'Save to Schedule'}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all duration-200"
        >
          <Share2 size={15} />
          Share
        </button>
      </div>
    </div>
  );
}