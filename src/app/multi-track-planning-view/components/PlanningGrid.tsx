'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

import SpeakerAvatar from '@/components/ui/SpeakerAvatar';
import { Star, Users, Clock, Tag } from 'lucide-react';
import type { Session, Room, SessionStatus } from '@/lib/mock-data';
import { formatTime } from '@/lib/mock-data';

interface SessionWithStatus extends Session {
  status: SessionStatus;
}

interface PlanningGridProps {
  sessions: SessionWithStatus[];
  rooms: Room[];
  now: Date;
  dayLabel?: string;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
];

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function isoToMinutes(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

const GRID_START = timeToMinutes('09:00');
const GRID_END = timeToMinutes('17:30');
const GRID_TOTAL = GRID_END - GRID_START;
const SLOT_HEIGHT = 100;

export default function PlanningGrid({ sessions, rooms, now, dayLabel }: PlanningGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [tooltipSession, setTooltipSession] = useState<SessionWithStatus | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowPct = ((nowMinutes - GRID_START) / GRID_TOTAL) * 100;
  const showNowLine = nowMinutes >= GRID_START && nowMinutes <= GRID_END;

  useEffect(() => {
    if (showNowLine && gridContainerRef.current) {
      const container = gridContainerRef.current;
      const containerHeight = container.clientHeight;
      const scrollToPct = nowPct - 15;
      const scrollTarget = (scrollToPct / 100) * container.scrollHeight;
      container.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  function getSessionStyle(session: Session) {
    const startMin = isoToMinutes(session.startTime);
    const endMin = isoToMinutes(session.endTime);
    const top = ((startMin - GRID_START) / GRID_TOTAL) * 100;
    const height = ((endMin - startMin) / GRID_TOTAL) * 100;
    return { top: `${top}%`, height: `${height}%` };
  }

  const handleSessionHover = useCallback((session: SessionWithStatus, e: React.MouseEvent) => {
    setHoveredSession(session.id);
    setTooltipSession(session);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = gridContainerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setTooltipPos({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 8,
      });
    }
  }, []);

  const handleSessionLeave = useCallback(() => {
    setHoveredSession(null);
    setTooltipSession(null);
    setTooltipPos(null);
  }, []);

  const totalHeight = TIME_SLOTS.length * SLOT_HEIGHT;

  return (
    <div className="glass-card overflow-hidden" style={{ position: 'relative' }}>
      {/* Room header row */}
      <div className="flex border-b border-white/[0.07]">
        {/* Time gutter */}
        <div className="w-16 flex-shrink-0 border-r border-white/[0.07] bg-white/[0.02]" />
        {rooms.map((room) => {
          const roomSessions = sessions.filter(s => s.room.id === room.id);
          const hasLive = roomSessions.some(s => s.status === 'live');
          return (
            <div
              key={`room-header-${room.id}`}
              className="flex-1 min-w-[160px] px-4 py-4 border-r border-white/[0.07] last:border-r-0"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: room.color }}
                />
                <span className="text-sm font-semibold text-white truncate">{room.name}</span>
                {hasLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {roomSessions.length} session{roomSessions.length !== 1 ? 's' : ''}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grid body */}
      <div
        className="flex overflow-x-auto scrollbar-thin overflow-y-auto"
        ref={gridContainerRef}
        style={{ maxHeight: '70vh' }}
      >
        {/* Time gutter */}
        <div className="w-16 flex-shrink-0 border-r border-white/[0.07] relative" style={{ height: `${totalHeight}px` }}>
          {TIME_SLOTS.map((slot, i) => (
            <div
              key={`time-${slot}`}
              className="absolute left-0 right-0 flex items-start justify-center pt-1"
              style={{ top: i * SLOT_HEIGHT, height: SLOT_HEIGHT }}
            >
              <span className="text-[10px] font-mono font-medium text-slate-600 tabular-nums">{slot}</span>
            </div>
          ))}
        </div>

        {/* Room columns */}
        <div className="flex flex-1 min-w-0">
          {rooms.map((room) => {
            const roomSessions = sessions.filter(s => s.room.id === room.id);
            return (
              <div
                key={`room-col-${room.id}`}
                className="flex-1 min-w-[160px] border-r border-white/[0.07] last:border-r-0 relative"
                style={{ height: `${totalHeight}px` }}
              >
                {/* Hour grid lines */}
                {TIME_SLOTS.map((_, i) => (
                  <div
                    key={`gridline-${room.id}-${i}`}
                    className="absolute left-0 right-0 border-t border-white/[0.04]"
                    style={{ top: i * SLOT_HEIGHT }}
                  />
                ))}

                {/* Now indicator */}
                {showNowLine && (
                  <div
                    className="absolute left-0 right-0 z-20 pointer-events-none"
                    style={{ top: `${nowPct}%` }}
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                      <div className="flex-1 h-px bg-red-400/60" style={{ boxShadow: '0 0 4px rgba(248,113,113,0.4)' }} />
                    </div>
                  </div>
                )}

                {/* Session cards */}
                {roomSessions.map((session) => {
                  const style = getSessionStyle(session);
                  const isHovered = hoveredSession === session.id;
                  const isFav = favorites.has(session.id);

                  return (
                    <Link
                      key={`grid-sess-${session.id}`}
                      href={`/session-detail-page?id=${session.id}`}
                      className={`absolute left-1 right-1 rounded-xl overflow-hidden transition-all duration-200 group cursor-pointer ${
                        isHovered ? 'z-10 shadow-2xl ring-1 ring-white/20' : 'z-0'
                      }`}
                      style={{
                        ...style,
                        minHeight: '40px',
                        background: session.status === 'live'
                          ? `linear-gradient(135deg, ${room.color}22, ${room.color}11)`
                          : session.status === 'ended'
                          ? 'rgba(255,255,255,0.02)'
                          : `rgba(255,255,255,0.04)`,
                        border: session.status === 'live'
                          ? `1px solid ${room.color}55`
                          : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: session.status === 'live'
                          ? `0 0 16px ${room.color}22`
                          : 'none',
                      }}
                      onMouseEnter={(e) => handleSessionHover(session, e)}
                      onMouseLeave={handleSessionLeave}
                    >
                      {/* Left color bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{ backgroundColor: session.status === 'ended' ? '#334155' : room.color }}
                      />

                      <div className="pl-3 pr-2 py-2 h-full flex flex-col justify-between overflow-hidden">
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <h4
                              className={`text-xs font-semibold leading-tight line-clamp-2 break-words ${
                                session.status === 'ended' ? 'text-slate-500' : 'text-white'
                              }`}
                            >
                              {session.title}
                            </h4>
                            <button
                              onClick={(e) => toggleFavorite(session.id, e)}
                              className={`flex-shrink-0 p-0.5 rounded transition-colors ${
                                isFav ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400'
                              }`}
                              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Star size={11} fill={isFav ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-end justify-between flex-shrink-0 mt-1">
                          <div className="flex -space-x-1.5">
                            {session.speakers.slice(0, 2).map((sp) => (
                              <SpeakerAvatar key={`grid-spk-${session.id}-${sp.id}`} name={sp.name} photo={sp.photo} size={20} />
                            ))}
                          </div>
                          {session.status === 'live' && (
                            <span className="text-[9px] font-bold text-emerald-400 animate-pulse">● LIVE</span>
                          )}
                          {session.status === 'upcoming' && (
                            <span className="text-[9px] text-slate-500 font-mono tabular-nums">
                              {formatTime(session.startTime)}
                            </span>
                          )}
                          {session.status === 'ended' && (
                            <span className="text-[9px] text-slate-600 font-mono tabular-nums">
                              {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Tooltip */}
      {tooltipSession && tooltipPos && hoveredSession && (
        <div
          ref={tooltipRef}
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="glass-card p-3 rounded-xl shadow-2xl border border-white/10 w-72 text-left">
            <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">{tooltipSession.title}</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock size={11} className="text-slate-500" />
                <span>{formatTime(tooltipSession.startTime)} — {formatTime(tooltipSession.endTime)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tooltipSession.room.color }} />
                <span>{tooltipSession.room.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users size={11} className="text-slate-500" />
                <span>{tooltipSession.speakers.map(s => s.name).join(', ')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users size={11} className="text-slate-500" />
                <span>{tooltipSession.capacity} seats</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Tag size={11} className="text-slate-500" />
                <span>{tooltipSession.track}</span>
              </div>
            </div>
            {tooltipSession.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tooltipSession.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 pt-2 border-t border-white/[0.06] text-[10px] text-slate-500">
              {tooltipSession.status === 'live' && (
                <span className="text-emerald-400 font-semibold">● Live now</span>
              )}
              {tooltipSession.status === 'upcoming' && (
                <span className="text-sky-400">Upcoming</span>
              )}
              {tooltipSession.status === 'ended' && (
                <span>Ended</span>
              )}
              <span className="mx-1.5">·</span>
              <span>{tooltipSession.questions.length} question{tooltipSession.questions.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 px-6 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <span className="text-xs text-slate-500">Legend:</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
        <span className="flex items-center gap-1.5 text-xs text-sky-400">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          Upcoming
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-slate-600" />
          Ended
        </span>
        <span className="flex items-center gap-1.5 text-xs text-red-400 sm:ml-auto">
          <span className="w-2 h-px bg-red-400" />
          Current time ({formatTime(now.toISOString())})
        </span>
      </div>
    </div>
  );
}
