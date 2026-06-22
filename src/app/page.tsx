'use client';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { UPCOMING_EVENTS, SPEAKERS, EVENT } from '@/lib/mock-data';
import Link from 'next/link';
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
  Star,
  Sparkles,
  Eye,
  Play,
} from 'lucide-react';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Technology': 'linear-gradient(135deg, #A8FF3E 0%, #7ACC2A 100%)',
  'AI & ML': 'linear-gradient(135deg, #FF6B2B 0%, #FF9A5C 100%)',
  'Design': 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
  'DevOps': 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
  'Data': 'linear-gradient(135deg, #FB923C 0%, #EA580C 100%)',
  'Security': 'linear-gradient(135deg, #F87171 0%, #DC2626 100%)',
  'Open Source': 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
  'Startup': 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
};

function getCategoryGradient(category?: string): string {
  return CATEGORY_GRADIENTS[category || ''] || 'linear-gradient(135deg, #A8FF3E 0%, #FF6B2B 100%)';
}

const STATS = [
  { label: 'Events This Year', value: '48', change: '+12%', icon: CalendarDays, color: '#A8FF3E' },
  { label: 'Total Speakers', value: '320+', change: '+8%', icon: Users, color: '#FF6B2B' },
  { label: 'Attendees', value: '24K+', change: '+31%', icon: TrendingUp, color: '#A8FF3E' },
  { label: 'Cities', value: '18', change: '+5', icon: Globe, color: '#FF6B2B' },
];

const CATEGORIES = ['All', 'Technology', 'AI & ML', 'Design', 'DevOps', 'Data', 'Security', 'Open Source', 'Startup'];

function AnimatedStatNumber({ value, delay }: { value: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      className={`font-display font-bold text-2xl lg:text-3xl text-white transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {value}
    </span>
  );
}

function EventCard({ event, index }: { event: typeof UPCOMING_EVENTS[0]; index: number }) {
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const initial = event?.title?.charAt(0) || 'E';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80 * index);
    return () => clearTimeout(t);
  }, [index]);

  const gradient = getCategoryGradient(event?.category);
  const isFree = event?.price === 'Free';
  const startDate = new Date(event?.startDate);
  const endDate = new Date(event?.endDate);
  const sameDay = startDate.toDateString() === endDate.toDateString();
  const dateStr = sameDay
    ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div
      className={`event-card-listing transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-display font-bold text-xl shadow-lg"
          style={{ background: gradient }}
        >
          {initial}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays size={13} className="text-[#666] flex-shrink-0" />
            <span className="text-[#777] text-xs font-medium truncate">{dateStr}</span>
            {event?.id === 'evt-001' && (
              <span className="live-badge ml-1 flex-shrink-0">
                <span className="live-dot" />
                LIVE
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-lg text-white leading-snug truncate group-hover:text-[#A8FF3E] transition-colors">
            {event?.title}
          </h3>
        </div>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }}
          className="flex-shrink-0 p-2 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-[#FF6B2B]/10 hover:border-[#FF6B2B]/30 transition-all duration-200"
          aria-label={saved ? 'Unsave event' : 'Save event'}
        >
          <Star
            size={16}
            className={`transition-colors duration-200 ${saved ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[#555]'}`}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 pl-[4.5rem]">
        <span className="tag-chip">{event?.category}</span>
        {event?.tags?.map((tag) => (
          <span key={tag} className="tag-chip">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pl-[4.5rem]">
        <div className="flex items-center gap-4 text-[#555] text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="flex-shrink-0" />
            {event?.city?.split(',')?.[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} className="flex-shrink-0" />
            {event?.attendees && event?.attendees >= 1000
              ? `${(event?.attendees / 1000)?.toFixed(1)}K`
              : event?.attendees || '—'}
          </span>
          <span className={`font-semibold ${isFree ? 'text-[#A8FF3E]' : 'text-[#FF6B2B]'}`}>
            {event?.price || 'Free'}
          </span>
        </div>

        <Link
          href={event?.id === 'evt-001' ? '/event-page' : '#'}
          className="btn-primary text-xs px-4 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye size={14} />
          View Event
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeCategory === 'All'
      ? UPCOMING_EVENTS
      : UPCOMING_EVENTS?.filter((e) => e?.category === activeCategory);

  return (
    <AppLayout activeRoute="/">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 pb-24 lg:pb-12">
        <section className="relative mb-14 overflow-hidden rounded-3xl border border-white/[0.07]">
          <div className="absolute inset-0 bg-[#0F0F0F] pointer-events-none" />
          <div className="absolute inset-0 hero-glow-left pointer-events-none" />
          <div className="absolute inset-0 hero-glow-right pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 p-8 lg:p-14">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              <div className="flex-1">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A8FF3E]/10 border border-[#A8FF3E]/20 text-[#A8FF3E] text-xs font-semibold mb-6 transition-all duration-700 ${
                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  <Sparkles size={13} className="animate-pulse-soft" />
                  <span>The Event Platform for Developers</span>
                </div>

                <h1
                  className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] mb-5 transition-all duration-700 delay-100 ${
                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Discover &amp; Attend
                  <br />
                  <span className="gradient-text-animated">World-Class Events</span>
                </h1>

                <p
                  className={`text-[#777] text-base lg:text-lg max-w-xl leading-relaxed mb-9 transition-all duration-700 delay-200 ${
                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Navigate conferences, track sessions in real-time, interact with speakers, and
                  build your personal schedule — all in one place.
                </p>

                <div
                  className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
                    heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <Link href="/event-page" className="btn-primary text-sm px-6 py-3">
                    <Play size={16} />
                    Explore DevConf Paris
                  </Link>
                  <Link
                    href="/multi-track-planning-view"
                    className="btn-ghost border border-white/[0.1] text-sm px-5 py-3"
                  >
                    View Planning Grid
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div
                className={`w-full lg:w-80 xl:w-[22rem] flex-shrink-0 transition-all duration-700 delay-400 ${
                  heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
              >
                <div className="glass-card overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={EVENT?.coverImage}
                      alt={EVENT?.coverImageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="live-badge">
                        <span className="live-dot" />
                        LIVE NOW
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white text-sm mb-1">
                      {EVENT?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[#555] text-xs mb-3">
                      <MapPin size={11} />
                      <span>{EVENT?.city}</span>
                      <span className="text-[#333]">·</span>
                      <Users size={11} />
                      <span>{EVENT?.attendees?.toLocaleString('en-US')} attendees</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {EVENT?.tags?.map((tag) => (
                        <span key={tag} className="tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STATS?.map((stat, i) => {
            const StatIcon = stat?.icon;
            return (
              <div
                key={stat?.label}
                className="glass-card-hover p-5 flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${stat?.color}12`,
                    border: `1px solid ${stat?.color}25`,
                  }}
                >
                  <StatIcon size={20} style={{ color: stat?.color }} />
                </div>
                <div>
                  <AnimatedStatNumber value={stat?.value} delay={300 + i * 120} />
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[#555] text-xs">{stat?.label}</p>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        color: stat?.color,
                        background: `${stat?.color}15`,
                      }}
                    >
                      {stat?.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mb-14">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">
                Upcoming Events
              </h2>
              <p className="text-[#555] text-sm mt-1">
                Discover conferences and meetups happening soon
              </p>
            </div>
            <span className="text-[#A8FF3E] text-sm font-semibold tabular-nums">
              {filtered?.length} event{filtered?.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-7 scrollbar-thin">
            {CATEGORIES?.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-250 ${
                  activeCategory === cat
                    ? 'bg-[#A8FF3E] text-[#0D0D0D] shadow-[0_2px_12px_rgba(168,255,62,0.3)]'
                    : 'bg-[#161616] text-[#666] hover:text-white border border-white/[0.07] hover:border-white/[0.15]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filtered?.map((event, idx) => (
              <EventCard key={event?.id} event={event} index={idx} />
            ))}
          </div>

          {filtered?.length === 0 && (
            <div className="glass-card p-12 text-center">
              <CalendarDays size={32} className="mx-auto text-[#333] mb-3" />
              <p className="text-[#555] text-sm">No events found in this category.</p>
            </div>
          )}
        </section>

        <section className="mb-14">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">
                Featured Speakers
              </h2>
              <p className="text-[#555] text-sm mt-1">
                World-class experts sharing their knowledge
              </p>
            </div>
            <Link href="/speakers" className="btn-ghost text-xs">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPEAKERS?.slice(0, 5)?.map((speaker) => (
              <Link
                key={speaker?.id}
                href="/speakers"
                className="glass-card-hover p-5 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-3 ring-2 ring-transparent group-hover:ring-[#A8FF3E]/40 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={speaker?.photo}
                    alt={`${speaker?.name} - ${speaker?.title} at ${speaker?.company}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-white text-sm mb-0.5 truncate max-w-full">
                  {speaker?.name}
                </p>
                <p className="text-[#555] text-xs truncate max-w-full">{speaker?.company}</p>
                <p className="text-[#444] text-[10px] truncate max-w-full mt-0.5">
                  {speaker?.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="rounded-3xl overflow-hidden relative p-8 lg:p-10"
          style={{
            background: 'linear-gradient(135deg, #0F0F0F 0%, #181818 100%)',
            border: '1px solid rgba(168,255,62,0.12)',
          }}
        >
          <div className="absolute inset-0 hero-glow-left pointer-events-none opacity-60" />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 50%, #A8FF3E, transparent 60%), radial-gradient(circle at 70% 50%, #FF6B2B, transparent 60%)',
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white mb-2">
                Ready to dive in?
              </h2>
              <p className="text-[#666] text-sm max-w-md">
                Explore the full DevConf Paris 2026 schedule, save your favorite sessions, and join
                the conversation.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/event-page" className="btn-primary text-sm px-6 py-3">
                <Zap size={16} />
                Go to Event
              </Link>
              <Link
                href="/multi-track-planning-view"
                className="btn-ghost border border-white/[0.1] text-sm px-5 py-3"
              >
                Planning Grid
              </Link>
            </div>
          </div>
        </section>
      </div>
      <MobileNav activeRoute="/" />
    </AppLayout>
  );
}