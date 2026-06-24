'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { useNotify } from 'ra-core';
import ReactAdminProvider from '@/components/ReactAdminProvider';

function SignupContent() {
  const router = useRouter();
  const notify = useNotify();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthLabel = (strength: number) => {
    const labels = ['', 'Très faible', 'Faible', 'Moyen', 'Bon', 'Excellent'];
    const colors = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-neon-green'];
    return { label: labels[strength], color: colors[strength] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      setIsLoading(false);
      return;
    }
    if (!formData.acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || "Erreur lors de l'inscription";
        if (response.status === 409) {
          errorMessage = "Ce compte existe déjà. Veuillez vous connecter.";
        }
        setError(errorMessage);
        notify(errorMessage, { type: 'warning' });
        setIsLoading(false);
        return;
      }

      notify("Compte créé avec succès !", { type: 'info' });
      router.push('/auth/login?registered=true');
    } catch {
      setError('Erreur réseau. Veuillez réessayer.');
      notify('Erreur réseau. Veuillez réessayer.', { type: 'warning' });
      setIsLoading(false);
    }
  };

  const strength = getStrengthLabel(passwordStrength);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <AppLogo size={32} />
            <span className="text-2xl font-bold font-display">
              <span className="text-neon-green">Event</span>
              <span className="text-white">Sync</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Créer votre compte</h1>
          <p className="text-dark-300">Commencez à gérer vos événements en quelques clics</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-neon-green' : 'text-dark-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? 'bg-neon-green text-dark-950' : 'bg-dark-800 text-dark-400'}`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-sm font-medium hidden sm:block">Compte</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-neon-green' : 'bg-dark-700'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-neon-green' : 'text-dark-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? 'bg-neon-green text-dark-950' : 'bg-dark-800 text-dark-400'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:block">Profil</span>
          </div>
        </div>

        <div className="bg-dark-900/80 backdrop-blur-xl border border-dark-700 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-dark-200 mb-2">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input id="fullName" type="text" value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                  placeholder="Jean Dupont" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">Adresse email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input id="email" type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                  placeholder="vous@exemple.com" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input id="password" type={showPassword ? 'text' : 'password'} value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }); checkPasswordStrength(e.target.value); }}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-12 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 transition-all"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-300 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-2 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div key={level} className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? passwordStrength <= 2 ? 'bg-red-400' : passwordStrength <= 3 ? 'bg-orange-400' : 'bg-neon-green' : 'bg-dark-700'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength.color}`}>{strength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-200 mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full bg-dark-800 border rounded-xl pl-11 pr-12 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-1 transition-all ${formData.confirmPassword ? formData.password === formData.confirmPassword ? 'border-neon-green focus:border-neon-green focus:ring-neon-green/50' : 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-dark-600 focus:border-neon-green focus:ring-neon-green/50'}`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-300 transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            <div className="flex items-start">
              <input id="accept-terms" type="checkbox" checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 mt-1 rounded bg-dark-800 border-dark-600 text-neon-green focus:ring-neon-green focus:ring-offset-0" />
              <label htmlFor="accept-terms" className="ml-3 text-sm text-dark-300">
                J'accepte les{' '}
                <Link href="/terms" className="text-neon-green hover:underline">conditions d'utilisation</Link>{' '}
                et la{' '}
                <Link href="/privacy" className="text-neon-green hover:underline">politique de confidentialité</Link>
              </label>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-dark-950 hover:bg-black text-white font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-neon-green/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Création du compte...
                </>
              ) : (
                <>Créer mon compte <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-700" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-900 text-dark-400">Ou s'inscrire avec</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl hover:bg-dark-700 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-sm text-dark-200">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl hover:bg-dark-700 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="text-sm text-dark-200">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl hover:bg-dark-700 transition-colors">
              <svg className="w-5 h-5 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              <span className="text-sm text-dark-200">Twitter</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-dark-400">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-neon-green hover:text-neon-green-dim transition-colors font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <ReactAdminProvider>
      <SignupContent />
    </ReactAdminProvider>
  );
}