'use client';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { Home, CalendarDays, LayoutGrid, Heart, User } from 'lucide-react';



const MOBILE_TABS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Event', href: '/event-page', icon: CalendarDays },
  { label: 'Planning', href: '/multi-track-planning-view', icon: LayoutGrid },
  { label: 'Favorites', href: '/favorites', icon: Heart },
  { label: 'Profile', href: '/profile', icon: User },
];

interface MobileNavProps {
  activeRoute?: string;
}

export default function MobileNav({ activeRoute }: MobileNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-xl border-t border-white/[0.07]">
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeRoute === tab.href;
          return (
            <Link
              key={`mob-${tab.href}`}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-[#A8FF3E]' : 'text-[#555] hover:text-[#888]'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
      <Link
  href="/auth/login"
  className="flex flex-col items-center gap-1 text-dark-400 hover:text-neon-green transition-colors"
>
  <LogIn className="w-5 h-5" />
  <span className="text-xs">Connexion</span>
</Link>
    </nav>
  );
}