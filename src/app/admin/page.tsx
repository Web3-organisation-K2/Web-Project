'use client';
import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { SESSIONS, SPEAKERS, ROOMS, UPCOMING_EVENTS } from '@/lib/mock-data';
import type { Session, Speaker, Question } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import {
  Users, MessageSquare, Zap, BarChart2, Settings, Star,
  ArrowUpRight, ArrowDownRight, Plus, Pencil, Trash2, Search,
  X, Heart, MessageCircle, CalendarDays
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

// ─── Existing Data Structures ───────────────────────────────────────

const TRACK_DATA = [
  { track: 'Engineering', sessions: 4, attendees: 820 },
  { track: 'AI & ML', sessions: 2, attendees: 560 },
  { track: 'Design', sessions: 2, attendees: 340 },
  { track: 'Data', sessions: 2, attendees: 480 },
  { track: 'Security', sessions: 1, attendees: 220 },
  { track: 'Platform', sessions: 1, attendees: 310 },
  { track: 'Workshop', sessions: 1, attendees: 60 },
];

const ATTENDANCE_DATA = [
  { time: '09:00', attendees: 320 },
  { time: '10:00', attendees: 780 },
  { time: '10:30', attendees: 1050 },
  { time: '11:00', attendees: 1180 },
  { time: '11:30', attendees: 980 },
  { time: '12:00', attendees: 620 },
  { time: '13:00', attendees: 890 },
  { time: '14:00', attendees: 1100 },
  { time: '15:00', attendees: 760 },
  { time: '16:00', attendees: 430 },
];

const ENGAGEMENT_DATA = [
  { name: 'Questions', value: 47, color: '#A8FF3E' },
  { name: 'Upvotes', value: 165, color: '#FF6B2B' },
  { name: 'Favorites', value: 89, color: '#60A5FA' },
];

const STAT_CARDS = [
  { label: 'Total Attendees', value: '1,247', change: '+12%', up: true, icon: Users, color: '#A8FF3E', newThisWeek: true },
  { label: 'Active Sessions', value: '4', change: 'Live now', up: true, icon: Zap, color: '#FF6B2B', newThisWeek: false },
  { label: 'Comments / Questions', value: '15', change: '+8 today', up: true, icon: MessageSquare, color: '#A8FF3E', newThisWeek: true },
  { label: 'Avg. Satisfaction', value: '4.8/5', change: '+0.3', up: true, icon: Star, color: '#FF6B2B', newThisWeek: false },
];

const RECENT_ACTIVITY = [
  { text: 'New question in "LLMs in Production"', time: '2m ago', type: 'question' },
  { text: 'Session "TypeScript 6 Deep Dive" starts in 15min', time: '5m ago', type: 'alert' },
  { text: '23 new attendees checked in', time: '12m ago', type: 'checkin' },
  { text: 'Speaker Amara Diallo confirmed attendance', time: '25m ago', type: 'speaker' },
  { text: 'Room Beta at 95% capacity', time: '31m ago', type: 'warning' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1C1C] border border-white/[0.1] rounded-xl px-3 py-2 text-xs">
        <p className="text-[#888] mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#A8FF3E' }} className="font-semibold">
            {p.value} {p.name}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Form Input Style ──────────────────────────────────────────────

const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#A8FF3E]/50 focus:ring-1 focus:ring-[#A8FF3E]/30 transition-all";

const labelClass = "block text-xs font-medium text-[#888] mb-1.5";

// ─── Modal Component ──────────────────────────────────────────────

function AdminModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#161616] border border-white/[0.08] rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <h3 className="font-display font-bold text-white text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-white hover:bg-white/[0.06] transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────

function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; itemName: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-[#161616] border border-white/[0.08] rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={20} className="text-[#FF6B2B]" />
          </div>
          <h3 className="font-display font-bold text-white text-lg mb-2">Delete {itemName}?</h3>
          <p className="text-[#888] text-sm mb-6">This action cannot be undone. The item will be permanently removed.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-sm text-[#888] hover:text-white hover:bg-white/[0.04] transition-all">
              Cancel
            </button>
            <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B2B] text-sm text-white font-semibold hover:bg-[#FF6B2B]/90 transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty Form Defaults ──────────────────────────────────────────

const emptySessionForm = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  roomId: ROOMS[0].id,
  track: '',
  capacity: 100,
  tags: '',
};

const emptySpeakerForm = {
  name: '',
  photo: '',
  bio: '',
  title: '',
  company: '',
  twitter: '',
  linkedin: '',
  website: '',
  github: '',
};

// ─── Main Component ──────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState<'overview' | 'sessions' | 'speakers' | 'questions'>('overview');

  // ── Sessions State ──
  const [sessions, setSessions] = useState<Session[]>(SESSIONS);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [sessionForm, setSessionForm] = useState(emptySessionForm);
  const [deleteSessionConfirm, setDeleteSessionConfirm] = useState<Session | null>(null);

  // ── Speakers State ──
  const [speakers, setSpeakers] = useState<Speaker[]>(SPEAKERS);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [speakerForm, setSpeakerForm] = useState(emptySpeakerForm);
  const [deleteSpeakerConfirm, setDeleteSpeakerConfirm] = useState<Speaker | null>(null);

  // ── Questions State ──
  const [allQuestions, setAllQuestions] = useState<Question[]>(() => {
    return SESSIONS.flatMap(s => s.questions.map(q => ({ ...q, sessionId: s.id })));
  });
  const [questionSearch, setQuestionSearch] = useState('');
  const [deleteQuestionConfirm, setDeleteQuestionConfirm] = useState<Question | null>(null);

  // ── Derived Data ──
  const questionsBySession = useMemo(() => {
    const map = new Map<string, number>();
    allQuestions.forEach(q => {
      map.set(q.sessionId, (map.get(q.sessionId) || 0) + 1);
    });
    return map;
  }, [allQuestions]);

  const totalQuestions = allQuestions.length;

  const filteredQuestions = useMemo(() => {
    if (!questionSearch.trim()) return allQuestions;
    const searchLower = questionSearch.toLowerCase();
    return allQuestions.filter(q => {
      const session = sessions.find(s => s.id === q.sessionId);
      const sessionTitle = session?.title.toLowerCase() || '';
      return sessionTitle.includes(searchLower) || q.content.toLowerCase().includes(searchLower) || (q.author || '').toLowerCase().includes(searchLower);
    });
  }, [allQuestions, questionSearch, sessions]);

  // ── Session Helpers ──
  function openAddSession() {
    setEditingSession(null);
    setSessionForm(emptySessionForm);
    setSessionModalOpen(true);
  }

  function openEditSession(session: Session) {
    setEditingSession(session);
    setSessionForm({
      title: session.title,
      description: session.description,
      startTime: session.startTime.slice(0, 16),
      endTime: session.endTime.slice(0, 16),
      roomId: session.room.id,
      track: session.track,
      capacity: session.capacity,
      tags: session.tags.join(', '),
    });
    setSessionModalOpen(true);
  }

  function saveSession() {
    const room = ROOMS.find(r => r.id === sessionForm.roomId) || ROOMS[0];
    const tags = sessionForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingSession) {
      setSessions(prev =>
        prev.map(s =>
          s.id === editingSession.id
            ? {
                ...s,
                title: sessionForm.title,
                description: sessionForm.description,
                startTime: sessionForm.startTime + ':00',
                endTime: sessionForm.endTime + ':00',
                room,
                track: sessionForm.track,
                capacity: Number(sessionForm.capacity),
                tags,
              }
            : s
        )
      );
      toast.success('Session updated successfully');
    } else {
      const newSession: Session = {
        id: `sess-${Date.now()}`,
        eventId: 'evt-001',
        title: sessionForm.title,
        description: sessionForm.description,
        startTime: sessionForm.startTime + ':00',
        endTime: sessionForm.endTime + ':00',
        room,
        track: sessionForm.track,
        capacity: Number(sessionForm.capacity),
        speakers: [],
        questions: [],
        tags,
      };
      setSessions(prev => [...prev, newSession]);
      toast.success('Session added successfully');
    }
    setSessionModalOpen(false);
  }

  function deleteSession(session: Session) {
    setSessions(prev => prev.filter(s => s.id !== session.id));
    setAllQuestions(prev => prev.filter(q => q.sessionId !== session.id));
    toast.success('Session deleted successfully');
  }

  // ── Speaker Helpers ──
  function openAddSpeaker() {
    setEditingSpeaker(null);
    setSpeakerForm(emptySpeakerForm);
    setSpeakerModalOpen(true);
  }

  function openEditSpeaker(speaker: Speaker) {
    setEditingSpeaker(speaker);
    setSpeakerForm({
      name: speaker.name,
      photo: speaker.photo,
      bio: speaker.bio,
      title: speaker.title,
      company: speaker.company,
      twitter: speaker.twitter || '',
      linkedin: speaker.linkedin || '',
      website: speaker.website || '',
      github: speaker.github || '',
    });
    setSpeakerModalOpen(true);
  }

  function saveSpeaker() {
    if (editingSpeaker) {
      setSpeakers(prev =>
        prev.map(s =>
          s.id === editingSpeaker.id
            ? {
                ...s,
                name: speakerForm.name,
                photo: speakerForm.photo,
                bio: speakerForm.bio,
                title: speakerForm.title,
                company: speakerForm.company,
                twitter: speakerForm.twitter || undefined,
                linkedin: speakerForm.linkedin || undefined,
                website: speakerForm.website || undefined,
                github: speakerForm.github || undefined,
              }
            : s
        )
      );
      toast.success('Speaker updated successfully');
    } else {
      const newSpeaker: Speaker = {
        id: `spk-${Date.now()}`,
        name: speakerForm.name,
        photo: speakerForm.photo,
        bio: speakerForm.bio,
        title: speakerForm.title,
        company: speakerForm.company,
        twitter: speakerForm.twitter || undefined,
        linkedin: speakerForm.linkedin || undefined,
        website: speakerForm.website || undefined,
        github: speakerForm.github || undefined,
        sessions: [],
        tags: [],
      };
      setSpeakers(prev => [...prev, newSpeaker]);
      toast.success('Speaker added successfully');
    }
    setSpeakerModalOpen(false);
  }

  function deleteSpeaker(speaker: Speaker) {
    setSpeakers(prev => prev.filter(s => s.id !== speaker.id));
    toast.success('Speaker deleted successfully');
  }

  // ── Question Helpers ──
  function deleteQuestion(question: Question) {
    setAllQuestions(prev => prev.filter(q => q.id !== question.id));
    toast.success('Question deleted successfully');
  }

  // ── Status badge ──
  function StatusBadge({ status }: { status: string }) {
    if (status === 'live') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#A8FF3E]/10 text-[#A8FF3E] border border-[#A8FF3E]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF3E] animate-pulse" />
          Live
        </span>
      );
    }
    if (status === 'ended') {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/[0.04] text-[#555] border border-white/[0.06]">
          Ended
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#FF6B2B]/10 text-[#FF6B2B] border border-[#FF6B2B]/20">
        Upcoming
      </span>
    );
  }

  function getSessionStatus(session: Session): string {
    const now = new Date('2026-04-26T10:45:00');
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    if (now >= start && now <= end) return 'live';
    if (now > end) return 'ended';
    return 'upcoming';
  }

  // ── Render ──

  return (
    <AppLayout activeRoute="/admin">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#666] text-xs mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FF6B2B]/15 text-[#FF6B2B] border border-[#FF6B2B]/25 font-semibold">ADMIN</span>
              <span>Dashboard</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-white">Admin Dashboard</h1>
            <p className="text-[#666] text-sm mt-1">DevConf Paris 2026 — Live Overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/settings" className="btn-ghost text-xs border border-white/[0.1]">
              <Settings size={14} />
              Settings
            </Link>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#A8FF3E]/10 border border-[#A8FF3E]/20">
              <div className="w-2 h-2 rounded-full bg-[#A8FF3E] animate-pulse" />
              <span className="text-[#A8FF3E] text-xs font-semibold">Event Live</span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-[#161616] border border-white/[0.07] mb-8 w-fit overflow-x-auto">
          {(['overview', 'sessions', 'speakers', 'questions'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap ${
                activeView === v ? 'bg-[#A8FF3E] text-[#0D0D0D]' : 'text-[#666] hover:text-white'
              }`}
            >
              {v === 'questions' ? '💬 Comments / Questions' : v}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            OVERVIEW TAB
        ═══════════════════════════════════════════════════════════ */}
        {activeView === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {STAT_CARDS.map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                        <Icon size={16} style={{ color: stat.color }} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {stat.newThisWeek && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#A8FF3E]/10 text-[#A8FF3E] border border-[#A8FF3E]/20">NEW</span>
                        )}
                        <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-[#A8FF3E]' : 'text-[#FF6B2B]'}`}>
                          {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {stat.change}
                        </div>
                      </div>
                    </div>
                    <p className="font-display font-bold text-2xl text-white mb-0.5">{stat.value}</p>
                    <p className="text-[#666] text-xs">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {/* Attendance over time */}
              <div className="glass-card p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">Attendance Over Time</h3>
                    <p className="text-[#555] text-xs mt-0.5">Live attendee count by hour</p>
                  </div>
                  <BarChart2 size={16} className="text-[#444]" />
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={ATTENDANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="attendees"
                      stroke="#A8FF3E"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#A8FF3E' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Pie */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">Engagement</h3>
                    <p className="text-[#555] text-xs mt-0.5">Interaction breakdown</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={ENGAGEMENT_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {ENGAGEMENT_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {ENGAGEMENT_DATA.map(item => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                        <span className="text-[#888]">{item.name}</span>
                      </div>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sessions by Track + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="glass-card p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">Sessions by Track</h3>
                    <p className="text-[#555] text-xs mt-0.5">Attendees per conference track</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={TRACK_DATA} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="track" tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="attendees" fill="#A8FF3E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sessions" fill="#FF6B2B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-5">
                <h3 className="font-display font-semibold text-white text-sm mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {RECENT_ACTIVITY.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        item.type === 'warning' ? 'bg-[#FF6B2B]' :
                        item.type === 'alert' ? 'bg-[#FF6B2B]' : 'bg-[#A8FF3E]'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#888] text-xs leading-relaxed">{item.text}</p>
                        <p className="text-[#444] text-[10px] mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SESSIONS MANAGEMENT TAB
        ═══════════════════════════════════════════════════════════ */}
        {activeView === 'sessions' && (
          <div className="space-y-6">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Sessions Management</h2>
                <p className="text-[#666] text-sm mt-0.5">{sessions.length} sessions total</p>
              </div>
              <button
                onClick={openAddSession}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A8FF3E] text-[#0D0D0D] text-sm font-semibold hover:bg-[#A8FF3E]/90 transition-all"
              >
                <Plus size={16} />
                Add Session
              </button>
            </div>

            {/* Sessions Table */}
            <div className="glass-card overflow-hidden">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Title</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Speaker(s)</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Room</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Time</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Track</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Status</th>
                      <th className="text-right text-[#555] text-xs font-medium px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(session => (
                      <tr key={session.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-white text-sm font-medium truncate max-w-[240px]">{session.title}</p>
                          <div className="flex gap-1.5 mt-1 flex-wrap">
                            {session.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/[0.04] text-[#666] border border-white/[0.06]">{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            {session.speakers.map(sp => (
                              <img key={sp.id} src={sp.photo} alt={sp.name} className="w-6 h-6 rounded-full object-cover border border-white/[0.1]" />
                            ))}
                            <span className="text-[#888] text-xs">
                              {session.speakers.map(s => s.name).join(', ') || <span className="text-[#444]">—</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: session.room.color }} />
                            <span className="text-[#888] text-xs">{session.room.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[#888] text-xs whitespace-nowrap">
                          {new Date(session.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                          {' – '}
                          {new Date(session.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-[#888] text-xs">{session.track}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={getSessionStatus(session)} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditSession(session)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#A8FF3E] hover:bg-[#A8FF3E]/10 transition-all"
                              title="Edit session"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteSessionConfirm(session)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all"
                              title="Delete session"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card layout */}
              <div className="md:hidden divide-y divide-white/[0.04]">
                {sessions.map(session => (
                  <div key={session.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{session.title}</p>
                        <p className="text-[#555] text-xs mt-0.5">{session.track}</p>
                      </div>
                      <StatusBadge status={getSessionStatus(session)} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#666]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: session.room.color }} />
                        {session.room.name}
                      </div>
                      <span>{new Date(session.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>Cap: {session.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {session.speakers.map(sp => (
                          <img key={sp.id} src={sp.photo} alt={sp.name} className="w-5 h-5 rounded-full object-cover border border-white/[0.1]" />
                        ))}
                        <span className="text-[#666] text-[10px] ml-1">
                          {session.speakers.map(s => s.name).join(', ') || 'No speakers'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditSession(session)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#A8FF3E] hover:bg-[#A8FF3E]/10 transition-all">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteSessionConfirm(session)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Modal */}
            <AdminModal
              isOpen={sessionModalOpen}
              onClose={() => setSessionModalOpen(false)}
              title={editingSession ? 'Edit Session' : 'Add Session'}
            >
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Title</label>
                  <input className={inputClass} value={sessionForm.title} onChange={e => setSessionForm(f => ({ ...f, title: e.target.value }))} placeholder="Session title" />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea className={inputClass + ' resize-none'} rows={3} value={sessionForm.description} onChange={e => setSessionForm(f => ({ ...f, description: e.target.value }))} placeholder="Session description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Time</label>
                    <input type="datetime-local" className={inputClass} value={sessionForm.startTime} onChange={e => setSessionForm(f => ({ ...f, startTime: e.target.value }))} />
                  </div>
                  <div>
                    <label className={labelClass}>End Time</label>
                    <input type="datetime-local" className={inputClass} value={sessionForm.endTime} onChange={e => setSessionForm(f => ({ ...f, endTime: e.target.value }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Room</label>
                    <select className={inputClass} value={sessionForm.roomId} onChange={e => setSessionForm(f => ({ ...f, roomId: e.target.value }))}>
                      {ROOMS.map(room => (
                        <option key={room.id} value={room.id} className="bg-[#161616] text-white">{room.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Track</label>
                    <input className={inputClass} value={sessionForm.track} onChange={e => setSessionForm(f => ({ ...f, track: e.target.value }))} placeholder="e.g. Engineering" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Capacity</label>
                    <input type="number" className={inputClass} value={sessionForm.capacity} onChange={e => setSessionForm(f => ({ ...f, capacity: Number(e.target.value) }))} min={1} />
                  </div>
                  <div>
                    <label className={labelClass}>Tags (comma-separated)</label>
                    <input className={inputClass} value={sessionForm.tags} onChange={e => setSessionForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g. ai, llm, web" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setSessionModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-sm text-[#888] hover:text-white hover:bg-white/[0.04] transition-all">
                    Cancel
                  </button>
                  <button onClick={saveSession} className="flex-1 px-4 py-2.5 rounded-xl bg-[#A8FF3E] text-[#0D0D0D] text-sm font-semibold hover:bg-[#A8FF3E]/90 transition-all">
                    {editingSession ? 'Update Session' : 'Add Session'}
                  </button>
                </div>
              </div>
            </AdminModal>

            {/* Delete Session Confirm */}
            <DeleteConfirmModal
              isOpen={deleteSessionConfirm !== null}
              onClose={() => setDeleteSessionConfirm(null)}
              onConfirm={() => { if (deleteSessionConfirm) deleteSession(deleteSessionConfirm); }}
              itemName="Session"
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SPEAKERS MANAGEMENT TAB
        ═══════════════════════════════════════════════════════════ */}
        {activeView === 'speakers' && (
          <div className="space-y-6">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Speakers Management</h2>
                <p className="text-[#666] text-sm mt-0.5">{speakers.length} speakers total</p>
              </div>
              <button
                onClick={openAddSpeaker}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A8FF3E] text-[#0D0D0D] text-sm font-semibold hover:bg-[#A8FF3E]/90 transition-all"
              >
                <Plus size={16} />
                Add Speaker
              </button>
            </div>

            {/* Speakers Table */}
            <div className="glass-card overflow-hidden">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Photo</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Name</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Title</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Company</th>
                      <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Sessions</th>
                      <th className="text-right text-[#555] text-xs font-medium px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {speakers.map(speaker => {
                      const speakerSessionCount = sessions.filter(s => s.speakers.some(sp => sp.id === speaker.id)).length;
                      return (
                        <tr key={speaker.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3.5">
                            <img
                              src={speaker.photo}
                              alt={`${speaker.name} - ${speaker.title} at ${speaker.company}`}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{speaker.name}</p>
                          </td>
                          <td className="px-5 py-3.5 text-[#888] text-xs">{speaker.title}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-[#A8FF3E] text-xs font-medium">{speaker.company}</span>
                          </td>
                          <td className="px-5 py-3.5 text-[#888] text-xs">{speakerSessionCount}</td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => openEditSpeaker(speaker)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#A8FF3E] hover:bg-[#A8FF3E]/10 transition-all"
                                title="Edit speaker"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteSpeakerConfirm(speaker)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all"
                                title="Delete speaker"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card layout */}
              <div className="md:hidden divide-y divide-white/[0.04]">
                {speakers.map(speaker => {
                  const speakerSessionCount = sessions.filter(s => s.speakers.some(sp => sp.id === speaker.id)).length;
                  return (
                    <div key={speaker.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={speaker.photo}
                          alt={`${speaker.name} - ${speaker.title} at ${speaker.company}`}
                          className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{speaker.name}</p>
                          <p className="text-[#666] text-xs truncate">{speaker.title} at <span className="text-[#A8FF3E]">{speaker.company}</span></p>
                          <p className="text-[#444] text-[10px] mt-0.5">{speakerSessionCount} session{speakerSessionCount !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEditSpeaker(speaker)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#A8FF3E] hover:bg-[#A8FF3E]/10 transition-all">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setDeleteSpeakerConfirm(speaker)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Speaker Modal */}
            <AdminModal
              isOpen={speakerModalOpen}
              onClose={() => setSpeakerModalOpen(false)}
              title={editingSpeaker ? 'Edit Speaker' : 'Add Speaker'}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input className={inputClass} value={speakerForm.name} onChange={e => setSpeakerForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelClass}>Photo URL</label>
                    <input className={inputClass} value={speakerForm.photo} onChange={e => setSpeakerForm(f => ({ ...f, photo: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea className={inputClass + ' resize-none'} rows={3} value={speakerForm.bio} onChange={e => setSpeakerForm(f => ({ ...f, bio: e.target.value }))} placeholder="Speaker biography" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Title</label>
                    <input className={inputClass} value={speakerForm.title} onChange={e => setSpeakerForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Staff Engineer" />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input className={inputClass} value={speakerForm.company} onChange={e => setSpeakerForm(f => ({ ...f, company: e.target.value }))} placeholder="e.g. Vercel" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Twitter</label>
                    <input className={inputClass} value={speakerForm.twitter} onChange={e => setSpeakerForm(f => ({ ...f, twitter: e.target.value }))} placeholder="@handle" />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input className={inputClass} value={speakerForm.linkedin} onChange={e => setSpeakerForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="username" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Website</label>
                    <input className={inputClass} value={speakerForm.website} onChange={e => setSpeakerForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." />
                  </div>
                  <div>
                    <label className={labelClass}>GitHub</label>
                    <input className={inputClass} value={speakerForm.github} onChange={e => setSpeakerForm(f => ({ ...f, github: e.target.value }))} placeholder="username" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setSpeakerModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.1] text-sm text-[#888] hover:text-white hover:bg-white/[0.04] transition-all">
                    Cancel
                  </button>
                  <button onClick={saveSpeaker} className="flex-1 px-4 py-2.5 rounded-xl bg-[#A8FF3E] text-[#0D0D0D] text-sm font-semibold hover:bg-[#A8FF3E]/90 transition-all">
                    {editingSpeaker ? 'Update Speaker' : 'Add Speaker'}
                  </button>
                </div>
              </div>
            </AdminModal>

            {/* Delete Speaker Confirm */}
            <DeleteConfirmModal
              isOpen={deleteSpeakerConfirm !== null}
              onClose={() => setDeleteSpeakerConfirm(null)}
              onConfirm={() => { if (deleteSpeakerConfirm) deleteSpeaker(deleteSpeakerConfirm); }}
              itemName="Speaker"
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            COMMENTS / QUESTIONS TAB
        ═══════════════════════════════════════════════════════════ */}
        {activeView === 'questions' && (
          <div className="space-y-6">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Comments / Questions</h2>
                <p className="text-[#666] text-sm mt-0.5">{totalQuestions} questions across {questionsBySession.size} session{questionsBySession.size !== 1 ? 's' : ''}</p>
              </div>
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  className={inputClass + ' pl-9 pr-9'}
                  value={questionSearch}
                  onChange={e => setQuestionSearch(e.target.value)}
                  placeholder="Search by session, question, or author..."
                />
                {questionSearch && (
                  <button onClick={() => setQuestionSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Questions per session summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {sessions
                .filter(s => questionsBySession.has(s.id))
                .map(session => (
                  <div key={session.id} className="glass-card p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.06]">
                      <MessageCircle size={14} className="text-[#A8FF3E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{session.title.length > 35 ? session.title.slice(0, 35) + '…' : session.title}</p>
                      <p className="text-[#555] text-[10px]">{questionsBySession.get(session.id)} question{(questionsBySession.get(session.id) || 0) !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Questions Table */}
            <div className="glass-card overflow-hidden">
              {filteredQuestions.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare size={32} className="text-[#333] mx-auto mb-3" />
                  <p className="text-[#555] text-sm">No questions found</p>
                  {questionSearch && (
                    <p className="text-[#444] text-xs mt-1">Try adjusting your search</p>
                  )}
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.07]">
                          <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Session Title</th>
                          <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Question</th>
                          <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Author</th>
                          <th className="text-center text-[#555] text-xs font-medium px-5 py-3">
                            <span className="inline-flex items-center gap-1"><ArrowUpRight size={12} /> Upvotes</span>
                          </th>
                          <th className="text-center text-[#555] text-xs font-medium px-5 py-3">
                            <span className="inline-flex items-center gap-1"><Heart size={12} /> Likes</span>
                          </th>
                          <th className="text-left text-[#555] text-xs font-medium px-5 py-3">Created</th>
                          <th className="text-right text-[#555] text-xs font-medium px-5 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredQuestions.map(question => {
                          const session = sessions.find(s => s.id === question.sessionId);
                          return (
                            <tr key={question.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                              <td className="px-5 py-3.5">
                                <p className="text-white text-xs font-medium truncate max-w-[180px]">{session?.title || 'Unknown Session'}</p>
                              </td>
                              <td className="px-5 py-3.5">
                                <p className="text-[#888] text-xs leading-relaxed line-clamp-2 max-w-[300px]">{question.content}</p>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="text-[#888] text-xs">{question.author || <span className="text-[#444] italic">Anonymous</span>}</span>
                              </td>
                              <td className="px-5 py-3.5 text-center">
                                <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-full bg-[#A8FF3E]/10 text-[#A8FF3E] text-xs font-bold">{question.upvotes}</span>
                              </td>
                              <td className="px-5 py-3.5 text-center">
                                <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-full bg-[#FF6B2B]/10 text-[#FF6B2B] text-xs font-bold">{Math.floor(Math.random() * 20) + 1}</span>
                              </td>
                              <td className="px-5 py-3.5 text-[#666] text-xs whitespace-nowrap">
                                {new Date(question.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center justify-end">
                                  <button
                                    onClick={() => setDeleteQuestionConfirm(question)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#666] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all"
                                    title="Delete question"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile card layout */}
                  <div className="lg:hidden divide-y divide-white/[0.04]">
                    {filteredQuestions.map(question => {
                      const session = sessions.find(s => s.id === question.sessionId);
                      return (
                        <div key={question.id} className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-[#A8FF3E] text-[10px] font-semibold uppercase tracking-wide truncate">{session?.title || 'Unknown'}</p>
                              <p className="text-white text-xs mt-1 leading-relaxed">{question.content}</p>
                            </div>
                            <button onClick={() => setDeleteQuestionConfirm(question)} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#555] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all flex-shrink-0">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] text-[#666]">
                              <span>by {question.author || 'Anonymous'}</span>
                              <span className="inline-flex items-center gap-0.5 text-[#A8FF3E]"><ArrowUpRight size={10} />{question.upvotes}</span>
                              <span className="inline-flex items-center gap-0.5 text-[#FF6B2B]"><Heart size={10} />{Math.floor(Math.random() * 20) + 1}</span>
                            </div>
                            <span className="text-[#444] text-[10px]">
                              {new Date(question.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Delete Question Confirm */}
            <DeleteConfirmModal
              isOpen={deleteQuestionConfirm !== null}
              onClose={() => setDeleteQuestionConfirm(null)}
              onConfirm={() => { if (deleteQuestionConfirm) deleteQuestion(deleteQuestionConfirm); }}
              itemName="Question"
            />
          </div>
        )}

      </div>
      <MobileNav activeRoute="/admin" />
    </AppLayout>
  );
}
