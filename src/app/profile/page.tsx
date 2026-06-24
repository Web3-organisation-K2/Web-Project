'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { Camera, Save, Mail, CheckCircle, LogOut } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  username: string;
  bio: string;
  company: string;
  title: string;
  avatar: string;
  role: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: '',
  email: '',
  username: '',
  bio: '',
  company: '',
  title: '',
  avatar: '',
  role: 'Participant',
};

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'preferences'>('profile');

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(userData);
    setProfile({
      ...DEFAULT_PROFILE,
      name: user.name || '',
      email: user.email || '',
      username: user.username || user.email?.split('@')[0] || '',
      bio: user.bio || '',
      company: user.company || '',
      title: user.title || '',
      role: user.role || 'Participant',
      avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}` || '',
    });
    setLoading(false);
  }, [router]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfile(prev => ({ ...prev, avatar: base64 }));
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          username: profile.username,
          bio: profile.bio,
          company: profile.company,
          title: profile.title,
          role: profile.role,
          avatar: profile.avatar,
        }),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.error('Erreur lors de la sauvegarde du profil');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la sauvegarde', error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem('user');
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  router.push('/auth/login');
};

  if (loading) {
    return (
      <AppLayout activeRoute="/profile">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout activeRoute="/profile">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-[#161616] border border-white/[0.07] mb-8 w-fit">
          {(['profile', 'account', 'preferences'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#A8FF3E] text-[#0D0D0D]'
                  : 'text-[#666] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
              <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">My Profile</h1>
          <p className="text-[#666] text-sm">Manage your personal information and preferences</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-all text-sm"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>

        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-4">Profile Photo</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={profile.avatar || 'https://i.pravatar.cc/150?img=1'}
                    alt={`${profile.name} profile photo`}
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#A8FF3E]/20"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#A8FF3E] flex items-center justify-center text-[#0D0D0D] hover:bg-[#BFFF5A] transition-colors"
                  >
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{profile.name || 'Votre nom'}</p>
                  <p className="text-[#666] text-xs mb-3">{profile.role} · {profile.company || 'Non défini'}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-ghost text-xs border border-white/[0.1] py-1.5"
                  >
                    Change photo
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Full Name</label>
                  <input type="text" value={profile.name} onChange={e => handleChange('name', e.target.value)} className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Username</label>
                  <input type="text" value={profile.username} onChange={e => handleChange('username', e.target.value)} className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Job Title</label>
                  <input type="text" value={profile.title} onChange={e => handleChange('title', e.target.value)} className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Company</label>
                  <input type="text" value={profile.company} onChange={e => handleChange('company', e.target.value)} className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#888] text-xs font-medium mb-2">Bio</label>
                  <textarea value={profile.bio} onChange={e => handleChange('bio', e.target.value)} rows={3} className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all resize-none" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-[#A8FF3E] text-sm">
                  <CheckCircle size={16} />
                  <span>Profile saved successfully!</span>
                </div>
              )}
              <button onClick={handleSave} className="btn-primary ml-auto">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Email Address</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2 bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5">
                      <Mail size={14} className="text-[#555]" />
                      <input type="email" value={profile.email} onChange={e => handleChange('email', e.target.value)} className="flex-1 bg-transparent text-white text-sm placeholder-[#444] outline-none" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-[#A8FF3E]/10 text-[#A8FF3E] border border-[#A8FF3E]/20">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileNav activeRoute="/profile" />
    </AppLayout>
  );
}