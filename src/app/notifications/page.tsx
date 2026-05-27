'use client';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { NOTIFICATIONS } from '@/lib/mock-data';
import type { Notification } from '@/lib/mock-data';
import { Bell, CheckCheck, Zap, Info, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';



const TYPE_CONFIG = {
  live: { icon: Zap, color: '#A8FF3E', bg: 'bg-[#A8FF3E]/10', border: 'border-[#A8FF3E]/20' },
  info: { icon: Info, color: '#60A5FA', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  success: { icon: CheckCircle, color: '#A8FF3E', bg: 'bg-[#A8FF3E]/10', border: 'border-[#A8FF3E]/20' },
  warning: { icon: AlertTriangle, color: '#FF6B2B', bg: 'bg-[#FF6B2B]/10', border: 'border-[#FF6B2B]/20' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <AppLayout activeRoute="/notifications">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A8FF3E]/10 border border-[#A8FF3E]/20 flex items-center justify-center relative">
              <Bell size={18} className="text-[#A8FF3E]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF6B2B] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-white">Notifications</h1>
              <p className="text-[#666] text-sm">{unreadCount} unread</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-ghost text-xs border border-white/[0.1]">
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-[#161616] border border-white/[0.07] mb-6 w-fit">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                filter === f ? 'bg-[#A8FF3E] text-[#0D0D0D]' : 'text-[#666] hover:text-white'
              }`}
            >
              {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {displayed.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#A8FF3E]/10 flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-[#A8FF3E]/40" />
            </div>
            <h3 className="font-display font-bold text-white text-base mb-2">All caught up!</h3>
            <p className="text-[#666] text-sm">No {filter === 'unread' ? 'unread ' : ''}notifications right now.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((notif, idx) => {
              const config = TYPE_CONFIG[notif.type];
              const Icon = config.icon;
              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`glass-card p-4 flex gap-4 cursor-pointer transition-all duration-200 hover:bg-[#1C1C1C] animate-fade-in-up ${
                    !notif.read ? 'border-l-2 border-l-[#A8FF3E]' : ''
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg} border ${config.border}`}>
                    <Icon size={16} style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${notif.read ? 'text-[#888]' : 'text-white'}`}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-[#A8FF3E] flex-shrink-0" />
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                          className="text-[#444] hover:text-[#FF6B2B] transition-colors"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#666] text-xs leading-relaxed mt-0.5">{notif.message}</p>
                    <p className="text-[#444] text-[10px] mt-1.5">{notif.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <MobileNav activeRoute="/notifications" />
    </AppLayout>
  );
}
