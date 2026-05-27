'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';
import { Settings, User, Bell, Shield, Palette, ChevronRight, Save, ArrowLeft } from 'lucide-react';



interface SettingToggle {
  id: string;
  label: string;
  desc: string;
  enabled: boolean;
}

const SETTING_SECTIONS = [
  {
    id: 'general',
    label: 'General',
    icon: Settings,
    color: '#A8FF3E',
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: Shield,
    color: '#FF6B2B',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    color: '#A8FF3E',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
    color: '#FF6B2B',
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const [generalToggles, setGeneralToggles] = useState<SettingToggle[]>([
    { id: 'public_profile', label: 'Public Profile', desc: 'Allow others to see your profile', enabled: true },
    { id: 'show_schedule', label: 'Show My Schedule', desc: 'Display your session schedule publicly', enabled: false },
    { id: 'analytics', label: 'Usage Analytics', desc: 'Help improve EventSync by sharing usage data', enabled: true },
  ]);

  const [adminToggles, setAdminToggles] = useState<SettingToggle[]>([
    { id: 'admin_mode', label: 'Admin Mode', desc: 'Enable admin dashboard and management tools', enabled: true },
    { id: 'live_moderation', label: 'Live Q&A Moderation', desc: 'Review questions before they appear publicly', enabled: false },
    { id: 'capacity_alerts', label: 'Capacity Alerts', desc: 'Get notified when rooms reach 80% capacity', enabled: true },
    { id: 'auto_live', label: 'Auto Live Detection', desc: 'Automatically mark sessions as live based on schedule', enabled: true },
    { id: 'export_data', label: 'Data Export', desc: 'Allow exporting event data as CSV/JSON', enabled: false },
  ]);

  const toggleGeneral = (id: string) => {
    setGeneralToggles(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
    setSaved(false);
  };

  const toggleAdmin = (id: string) => {
    setAdminToggles(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppLayout activeRoute="/settings">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="btn-ghost p-2 border border-white/[0.08]">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Settings</h1>
            <p className="text-[#666] text-sm">Manage your EventSync preferences</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Nav */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="glass-card p-2 space-y-1">
              {SETTING_SECTIONS.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'text-[#A8FF3E] bg-[#A8FF3E]/10 border border-[#A8FF3E]/20'
                        : 'text-[#666] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                    <ChevronRight size={14} className="ml-auto opacity-40" />
                  </button>
                );
              })}

              <div className="pt-2 mt-2 border-t border-white/[0.06]">
                <Link
                  href="/admin"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all duration-200"
                >
                  <Shield size={16} />
                  Admin Dashboard
                  <ChevronRight size={14} className="ml-auto opacity-40" />
                </Link>
                <Link
                  href="/profile"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#666] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                >
                  <User size={16} />
                  Edit Profile
                  <ChevronRight size={14} className="ml-auto opacity-40" />
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {activeSection === 'general' && (
              <>
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-white text-sm mb-5">General Settings</h2>
                  <div className="space-y-5">
                    {generalToggles.map(toggle => (
                      <div key={toggle.id} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-white text-sm font-medium">{toggle.label}</p>
                          <p className="text-[#555] text-xs mt-0.5">{toggle.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleGeneral(toggle.id)}
                          className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                            toggle.enabled ? 'bg-[#A8FF3E]' : 'bg-[#222]'
                          }`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                            toggle.enabled ? 'left-6' : 'left-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-white text-sm mb-5">Event Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#888] text-xs font-medium mb-2">Default View</label>
                      <select className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#A8FF3E]/40">
                        <option value="event">Event Overview</option>
                        <option value="planning">Planning Grid</option>
                        <option value="home">Home Page</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#888] text-xs font-medium mb-2">Time Format</label>
                      <div className="flex gap-2">
                        {['24h', '12h'].map(fmt => (
                          <button key={fmt} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                            fmt === '24h' ?'bg-[#A8FF3E]/10 border-[#A8FF3E]/30 text-[#A8FF3E]' :'bg-[#111111] border-white/[0.08] text-[#666] hover:text-white'
                          }`}>
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'admin' && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B2B]/15 border border-[#FF6B2B]/25 flex items-center justify-center">
                    <Shield size={15} className="text-[#FF6B2B]" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-white text-sm">Admin Panel Settings</h2>
                    <p className="text-[#555] text-xs">Configure admin features and permissions</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {adminToggles.map(toggle => (
                    <div key={toggle.id} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white text-sm font-medium">{toggle.label}</p>
                        <p className="text-[#555] text-xs mt-0.5">{toggle.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleAdmin(toggle.id)}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                          toggle.enabled ? 'bg-[#FF6B2B]' : 'bg-[#222]'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                          toggle.enabled ? 'left-6' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <Link href="/admin" className="btn-orange text-sm">
                    <Shield size={15} />
                    Open Admin Dashboard
                  </Link>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="glass-card p-6">
                <h2 className="font-display font-semibold text-white text-sm mb-5">Notification Settings</h2>
                <div className="space-y-5">
                  {[
                    { label: 'Session reminders', desc: 'Get notified 15 min before sessions', enabled: true },
                    { label: 'Live session alerts', desc: 'Notify when followed sessions go live', enabled: true },
                    { label: 'Q&A activity', desc: 'Notify when your questions get upvoted', enabled: false },
                    { label: 'Schedule changes', desc: 'Notify about time or room changes', enabled: true },
                    { label: 'New speakers', desc: 'Get updates when new speakers are added', enabled: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white text-sm font-medium">{item.label}</p>
                        <p className="text-[#555] text-xs mt-0.5">{item.desc}</p>
                      </div>
                      <div className={`relative w-11 h-6 rounded-full cursor-pointer flex-shrink-0 ${item.enabled ? 'bg-[#A8FF3E]' : 'bg-[#222]'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${item.enabled ? 'left-6' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="glass-card p-6">
                <h2 className="font-display font-semibold text-white text-sm mb-5">Appearance</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[#888] text-xs font-medium mb-3">Accent Color</label>
                    <div className="flex gap-3">
                      {[
                        { name: 'Neon Green', color: '#A8FF3E' },
                        { name: 'Orange', color: '#FF6B2B' },
                        { name: 'Blue', color: '#60A5FA' },
                        { name: 'Purple', color: '#A78BFA' },
                      ].map(c => (
                        <button key={c.name} title={c.name}
                          className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-[#111111] ring-transparent hover:ring-white/30 transition-all"
                          style={{ background: c.color }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#888] text-xs font-medium mb-3">Font Size</label>
                    <div className="flex gap-2">
                      {['Small', 'Medium', 'Large'].map((size, i) => (
                        <button key={size} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          i === 1
                            ? 'bg-[#A8FF3E]/10 border-[#A8FF3E]/30 text-[#A8FF3E]'
                            : 'bg-[#111111] border-white/[0.08] text-[#666] hover:text-white'
                        }`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save */}
            <div className="flex items-center justify-end gap-3">
              {saved && <span className="text-[#A8FF3E] text-sm">Settings saved!</span>}
              <button onClick={handleSave} className="btn-primary">
                <Save size={15} />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileNav activeRoute="/settings" />
    </AppLayout>
  );
}
