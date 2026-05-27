'use client';

import { useSearchParams } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import SessionDetailHero from './components/SessionDetailHero';
import SessionSpeakers from './components/SessionSpeakers';
import SessionQnA from './components/SessionQnA';
import { SESSIONS, getSessionStatus, MOCK_NOW, formatTime } from '@/lib/mock-data';

export default function SessionDetailPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('id') || 'sess-001';
  const session = SESSIONS.find((s) => s.id === sessionId) || SESSIONS[0];
  const status = getSessionStatus(session, MOCK_NOW);

  return (
    <AppLayout activeRoute="/session-detail-page">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="xl:col-span-2 space-y-6">
            <SessionDetailHero session={session} status={status} />
            <SessionQnA session={session} status={status} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SessionSpeakers speakers={session.speakers} />
            <OtherSessionsPanel currentId={session.id} />
          </div>
        </div>
      </div>
      <MobileNav activeRoute="/session-detail-page" />
    </AppLayout>
  );
}

function OtherSessionsPanel({ currentId }: { currentId: string }) {
  const others = SESSIONS
    .filter((s) => s.id !== currentId)
    .slice(0, 4)
    .map((s) => ({ ...s, status: getSessionStatus(s, MOCK_NOW) }));

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-sm font-bold text-white mb-4">Other Sessions</h3>
      <div className="space-y-3">
        {others.map((s) => (
          <a key={`other-${s.id}`} href={`/session-detail-page?id=${s.id}`} className="block p-3 rounded-xl hover:bg-white/[0.04] transition-colors border border-white/[0.05] hover:border-white/[0.1]">
            <div className="flex items-center gap-2 mb-1.5">
              {s.status === 'live' && (
                <span className="text-[9px] font-bold text-emerald-400 animate-pulse">● LIVE</span>
              )}
              <span className="text-[10px] text-slate-500 font-mono tabular-nums">{formatTime(s.startTime)}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-500">{s.room.name}</span>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-snug line-clamp-2">{s.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
