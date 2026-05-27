'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { SPEAKERS } from '@/lib/mock-data';
import Link from 'next/link';
import { Search, Globe, Users, ExternalLink } from 'lucide-react';

const TRACKS = ['All', 'Engineering', 'AI & ML', 'Design', 'Data Engineering', 'Security', 'Product', 'Platform', 'Workshop'];

export default function SpeakersPage() {
  const [search, setSearch] = useState('');
  const [activeTrack, setActiveTrack] = useState('All');

  const filtered = SPEAKERS?.filter(s => {
    const matchSearch = s?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      s?.company?.toLowerCase()?.includes(search?.toLowerCase()) ||
      s?.title?.toLowerCase()?.includes(search?.toLowerCase());
    const matchTrack = activeTrack === 'All' || s?.tags?.some(t => t?.toLowerCase()?.includes(activeTrack?.toLowerCase()));
    return matchSearch && matchTrack;
  });

  return (
    <AppLayout activeRoute="/speakers">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#666] text-sm mb-3">
            <Link href="/" className="hover:text-[#A8FF3E] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Speakers</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl text-white mb-1">Speakers</h1>
              <p className="text-[#666] text-sm">{SPEAKERS?.length} world-class experts at DevConf Paris 2026</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161616] border border-white/[0.07] w-full sm:w-64">
              <Search size={15} className="text-[#555] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search speakers..."
                value={search}
                onChange={e => setSearch(e?.target?.value)}
                className="bg-transparent text-white text-sm placeholder-[#555] outline-none flex-1 min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Track Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin">
          {TRACKS?.map(track => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTrack === track
                  ? 'bg-[#A8FF3E] text-[#0D0D0D]'
                  : 'bg-[#1C1C1C] text-[#888] hover:text-white border border-white/[0.07]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Speakers Grid */}
        {filtered?.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Users size={40} className="text-[#333] mx-auto mb-3" />
            <p className="text-[#666]">No speakers found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered?.map((speaker, idx) => (
              <div
                key={speaker?.id}
                className="glass-card-hover p-5 group animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={speaker?.photo}
                      alt={`${speaker?.name} - ${speaker?.title} at ${speaker?.company}, speaker at DevConf Paris 2026`}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-[#A8FF3E]/30 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#A8FF3E] border-2 border-[#111111]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-white text-sm truncate group-hover:text-[#A8FF3E] transition-colors">
                      {speaker?.name}
                    </h3>
                    <p className="text-[#666] text-xs truncate">{speaker?.title}</p>
                    <p className="text-[#A8FF3E] text-xs font-medium truncate">{speaker?.company}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[#666] text-xs leading-relaxed mb-4 line-clamp-3">{speaker?.bio}</p>

                {/* Tags */}
                {speaker?.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {speaker?.tags?.slice(0, 3)?.map(tag => (
                      <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Sessions count */}
                {speaker?.sessions && speaker?.sessions?.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[#555] text-xs mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                    <span>{speaker?.sessions?.length} session{speaker?.sessions?.length > 1 ? 's' : ''} at this event</span>
                  </div>
                )}

                {/* Social links */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.05]">
                  {speaker?.twitter && (
                    <a href={`https://twitter.com/${speaker?.twitter}`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-[#A8FF3E]/10 hover:text-[#A8FF3E] flex items-center justify-center text-[#555] transition-all text-[10px] font-bold">
                      𝕏
                    </a>
                  )}
                  {speaker?.linkedin && (
                    <a href={`https://linkedin.com/in/${speaker?.linkedin}`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-[#A8FF3E]/10 hover:text-[#A8FF3E] flex items-center justify-center text-[#555] transition-all">
                      <Globe size={12} />
                    </a>
                  )}
                  {speaker?.github && (
                    <a href={`https://github.com/${speaker?.github}`} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-[#A8FF3E]/10 hover:text-[#A8FF3E] flex items-center justify-center text-[#555] transition-all">
                      <Globe size={12} />
                    </a>
                  )}
                  {speaker?.website && (
                    <a href={speaker?.website} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-[#A8FF3E]/10 hover:text-[#A8FF3E] flex items-center justify-center text-[#555] transition-all">
                      <Globe size={12} />
                    </a>
                  )}
                  <Link href={`/session-detail-page?id=${speaker?.sessions?.[0] || 'sess-001'}`}
                    className="ml-auto flex items-center gap-1 text-[#555] hover:text-[#A8FF3E] text-xs transition-colors">
                    Sessions <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <MobileNav activeRoute="/speakers" />
    </AppLayout>
  );
}
