'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import PlanningGrid from './components/PlanningGrid';
import PlanningHeader from './components/PlanningHeader';
import { SESSIONS, SPEAKERS, ROOMS, UPCOMING_EVENTS, getSessionStatus, MOCK_NOW, formatShortDate } from '@/lib/mock-data';
import { Calendar, MapPin, ChevronDown, Users} from 'lucide-react';

const DAY2_SESSIONS: Session[] = [
  {
    id: 'sess-d2-01',
    eventId: 'evt-001',
    title: 'Opening Keynote: The Future of Developer Experience',
    description: 'Léa Fontaine kicks off Day 2 with a visionary keynote on the evolving landscape of developer experience. From AI-assisted coding to edge-native architectures, discover the trends that will define the next decade of software development.',
    startTime: '2026-04-27T09:00:00',
    endTime: '2026-04-27T10:00:00',
    room: ROOMS[0],
    track: 'Keynote',
    speakers: [SPEAKERS[0]],
    capacity: 800,
    questions: [],
    tags: ['keynote', 'dx'],
  },
  {
    id: 'sess-d2-02',
    eventId: 'evt-002',
    title: 'Workshop: Building AI-Powered Developer Tools',
    description: 'A hands-on workshop where Amara Diallo guides participants through building AI-powered tools using LLMs. Topics include prompt engineering, function calling, and deploying AI assistants for developer workflows.',
    startTime: '2026-04-27T10:30:00',
    endTime: '2026-04-27T12:00:00',
    room: ROOMS[4],
    track: 'Workshop',
    speakers: [SPEAKERS[2]],
    capacity: 60,
    questions: [],
    tags: ['ai', 'workshop'],
  },
  {
    id: 'sess-d2-03',
    eventId: 'evt-003',
    title: 'Scaling Design Systems Across Organizations',
    description: 'Thomas Ruelle shares lessons from Figma\'s journey scaling their design system across 300+ designers and engineers. Learn about governance models, contribution workflows, and maintaining consistency at scale.',
    startTime: '2026-04-27T11:00:00',
    endTime: '2026-04-27T11:45:00',
    room: ROOMS[3],
    track: 'Design',
    speakers: [SPEAKERS[3]],
    capacity: 150,
    questions: [],
    tags: ['design', 'scaling'],
  },
  {
    id: 'sess-d2-04',
    eventId: 'evt-004',
    title: 'The State of WebAssembly in 2026',
    description: 'Nadia Kowalski presents the latest developments in the WebAssembly ecosystem — the Component Model, WASI preview 2, and real-world production deployments pushing the boundaries of what runs on the web and at the edge.',
    startTime: '2026-04-27T13:00:00',
    endTime: '2026-04-27T13:45:00',
    room: ROOMS[1],
    track: 'Engineering',
    speakers: [SPEAKERS[9]],
    capacity: 200,
    questions: [],
    tags: ['wasm', 'engineering'],
  },
  {
    id: 'sess-d2-05',
    eventId: 'evt-005',
    title: 'Closing Ceremony & Awards',
    description: 'Join us for the grand finale of DevConf Paris 2026! Community awards, best talk recognitions, and a look ahead at what\'s coming next. Celebrate two incredible days of learning and connection.',
    startTime: '2026-04-27T16:00:00',
    endTime: '2026-04-27T17:00:00',
    room: ROOMS[0],
    track: 'Community',
    speakers: [SPEAKERS[0], SPEAKERS[4]],
    capacity: 800,
    questions: [],
    tags: ['community', 'closing'],
  },
];

const MOCK_NOW_DAY2 = new Date('2026-04-27T10:30:00');

interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  room: typeof ROOMS[number];
  track: string;
  speakers: typeof SPEAKERS[number][];
  capacity: number;
  questions: never[];
  tags: string[];
}

const DAYS_INFO = [
  {
    label: 'Day 1 — Sun, 26 Apr',
    date: 'Sun, 26 Apr',
    sessions: SESSIONS,
    now: MOCK_NOW,
  },
  {
    label: 'Day 2 — Mon, 27 Apr',
    date: 'Mon, 27 Apr',
    sessions: DAY2_SESSIONS,
    now: MOCK_NOW_DAY2,
  },
];

const EVENTS_PER_PAGE = 4;

export default function MultiTrackPlanningPage() {
  const [currentDay, setCurrentDay] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState(EVENTS_PER_PAGE);

  const dayInfo = DAYS_INFO[currentDay];

  const sessionsWithStatus = useMemo(
    () =>
      dayInfo.sessions.map((s) => ({
        ...s,
        status: getSessionStatus(s, dayInfo.now),
      })),
    [dayInfo]
  );

  const liveCount = sessionsWithStatus.filter((s) => s.status === 'live').length;

  // Future events: UPCOMING_EVENTS excluding evt-001 (current event)
  const futureEvents = useMemo(
    () => UPCOMING_EVENTS.filter((e) => e.id !== 'evt-001'),
    []
  );

  const displayedEvents = futureEvents.slice(0, visibleEvents);
  const hasMoreEvents = visibleEvents < futureEvents.length;

  const handlePrevDay = () => {
    if (currentDay > 0) {
      setCurrentDay(0);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 1) {
      setCurrentDay(1);
    }
  };

  const handleLoadMore = () => {
    setVisibleEvents((prev) => Math.min(prev + EVENTS_PER_PAGE, futureEvents.length));
  };

  return (
    <AppLayout activeRoute="/multi-track-planning-view">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 pb-24 lg:pb-8">
        <PlanningHeader
          liveCount={liveCount}
          currentDay={currentDay}
          dayLabel={dayInfo.label}
          dayDate={dayInfo.date}
          sessionCount={dayInfo.sessions.length}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
        />
        <PlanningGrid
          sessions={sessionsWithStatus}
          rooms={ROOMS}
          now={dayInfo.now}
          dayLabel={dayInfo.label}
        />

        {/* Future Events Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Future Events</h2>
              <p className="text-sm text-slate-500 mt-1">Upcoming conferences you might be interested in</p>
            </div>
            <span className="text-xs text-slate-600 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
              {futureEvents.length} events
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/event-detail-page?id=${event.id}`}
                className="glass-card group rounded-xl overflow-hidden hover:border-white/[0.12] transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
              >
                {/* Cover image */}
                <div className="relative h-32 overflow-hidden bg-white/[0.02]">
                  <img
                    src={event.coverImage}
                    alt={event.coverImageAlt}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  {event.category && (
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 text-slate-300 backdrop-blur-sm border border-white/[0.08]">
                      {event.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-sky-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{event.description}</p>

                  <div className="flex flex-col gap-1 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={11} />
                      <span>{formatShortDate(event.startDate)}{event.startDate !== event.endDate ? ` — ${formatShortDate(event.endDate)}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={11} />
                      <span>{event.city}</span>
                    </div>
                    {event.attendees && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users size={11} />
                        <span>{event.attendees.toLocaleString('en-US')} attendees</span>
                      </div>
                    )}
                  </div>

                  {event.price && (
                    <div className="mt-3 pt-3 border-t border-white/[0.06]">
                      <span className={`text-xs font-semibold ${event.price === 'Free' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {event.price}
                      </span>
                    </div>
                  )}

                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {hasMoreEvents && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
              >
                <ChevronDown size={16} />
                Load More Events
                <span className="text-xs text-slate-600 ml-1">
                  ({futureEvents.length - visibleEvents} remaining)
                </span>
              </button>
            </div>
          )}
        </section>
      </div>
      <MobileNav activeRoute="/multi-track-planning-view" />
    </AppLayout>
  );
}
