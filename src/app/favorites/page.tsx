'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { UPCOMING_EVENTS } from '@/lib/mock-data';
import Link from 'next/link';
import { Heart, CalendarDays, MapPin, Trash2, Star } from 'lucide-react';

const STORAGE_KEY = 'eventsync_favorite_events';

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavoriteIds(JSON.parse(stored));
      else {
        const defaults = ['evt-001', 'evt-002', 'evt-005'];
        setFavoriteIds(defaults);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      }
    } catch {
      setFavoriteIds(['evt-001', 'evt-002', 'evt-005']);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favoriteIds.filter(f => f !== id);
    setFavoriteIds(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  const favoriteEvents = UPCOMING_EVENTS.filter(e => favoriteIds.includes(e.id));

  if (!mounted) return null;

  return (
    <AppLayout activeRoute="/favorites">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B2B]/15 border border-[#FF6B2B]/25 flex items-center justify-center">
              <Heart size={18} className="text-[#FF6B2B]" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-white">Favorites</h1>
              <p className="text-[#666] text-sm">{favoriteEvents.length} saved event{favoriteEvents.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {favoriteEvents.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6B2B]/10 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-[#FF6B2B]/50" />
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2">No favorites yet</h3>
            <p className="text-[#666] text-sm mb-6 max-w-xs mx-auto">
              Browse upcoming events and save the ones you don't want to miss.
            </p>
            <Link href="/" className="btn-primary">
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favoriteEvents.map((event, idx) => (
              <div
                key={event.id}
                className="glass-card-hover overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.coverImage}
                    alt={event.coverImageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
                  <button
                    onClick={() => removeFavorite(event.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FF6B2B]/20 border border-[#FF6B2B]/30 flex items-center justify-center text-[#FF6B2B] hover:bg-[#FF6B2B]/40 transition-all"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={13} />
                  </button>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      event.price === 'Free' ?'bg-[#A8FF3E]/20 text-[#A8FF3E] border border-[#A8FF3E]/30' :'bg-[#FF6B2B]/20 text-[#FF6B2B] border border-[#FF6B2B]/30'
                    }`}>
                      {event.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white text-sm mb-1 group-hover:text-[#A8FF3E] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-[#666] text-xs leading-relaxed mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#555] text-xs">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={11} />
                        {new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {event.city.split(',')[0]}
                      </span>
                    </div>
                    {event.id === 'evt-001' && (
                      <Link href="/event-page" className="text-[#A8FF3E] text-xs font-medium hover:underline">
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {favoriteEvents.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => {
                setFavoriteIds([]);
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify([])); } catch {}
              }}
              className="btn-ghost text-xs border border-white/[0.1] text-[#FF6B2B] hover:bg-[#FF6B2B]/10"
            >
              <Trash2 size={13} />
              Clear all favorites
            </button>
          </div>
        )}
      </div>
      <MobileNav activeRoute="/favorites" />
    </AppLayout>
  );
}
