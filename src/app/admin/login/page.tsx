'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { authProvider } from '@/lib/ra-providers';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      setIsLoading(false);
      return;
    }

    try {
      
      await authProvider.login({ username: formData.email, password: formData.password });

      
      router.push('/admin');
    } catch (err: any) {
     
      setError(err?.message || 'Connexion admin impossible.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* En-tête : logo + titre */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <AppLogo size={48} />
            <span className="text-2xl font-bold font-display">
              <span className="text-neon-green">Event</span>
              <span className="text-white">Sync</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-orange/10 border border-neon-orange/30 text-neon-orange text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            Espace Administrateur
          </div>

          <h1 className="text-3xl font-bold font-display text-white mb-2">Connexion admin</h1>
          <p className="text-dark-300">Connectez-vous pour gérer la plateforme.</p>
        </div>

        {/* Carte du formulaire */}
        <div className="bg-dark-900/80 backdrop-blur-xl border border-dark-700 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                Adresse email admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                  placeholder="admin@exemple.com"
                />
              </div>
            </div>

            {/* Champ mot de passe (avec bouton "afficher/masquer") */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-12 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-950 hover:bg-black text-white font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-neon-green/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion...' : 'Se connecter en admin'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="mt-6 text-center text-dark-400 text-sm">
            Pas admin ?{' '}
            <Link href="/auth/login" className="text-neon-green hover:text-neon-green-dim transition-colors font-medium">
              Retour à la connexion utilisateur
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
