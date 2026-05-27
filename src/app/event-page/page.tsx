
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import EventHero from './components/EventHero';
import EventStats from './components/EventStats';
import LiveSessionsStrip from './components/LiveSessionsStrip';
import EventSessionList from './components/EventSessionList';
import { EVENT, SESSIONS, getSessionStatus, MOCK_NOW } from '@/lib/mock-data';

export default function EventPage() {
  const sessionsWithStatus = SESSIONS?.map((s) => ({
    ...s,
    status: getSessionStatus(s, MOCK_NOW),
  }));

  const liveSessions = sessionsWithStatus?.filter((s) => s?.status === 'live');
  const totalSpeakers = new Set(SESSIONS.flatMap((s) => s.speakers.map((sp) => sp.id)))?.size;

  return (
    <AppLayout activeRoute="/event-page">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 pb-24 lg:pb-8">
        <EventHero event={EVENT} liveCount={liveSessions?.length} />
        <EventStats
          totalSessions={SESSIONS?.length}
          liveSessions={liveSessions?.length}
          totalSpeakers={totalSpeakers}
          totalRooms={5}
        />
        {liveSessions?.length > 0 && (
          <LiveSessionsStrip sessions={liveSessions} />
        )}
        <EventSessionList sessions={sessionsWithStatus} />
      </div>
      <MobileNav activeRoute="/event-page" />
    </AppLayout>
  );
}