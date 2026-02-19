import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Globe, BookOpen, Zap, Shield, Network,
  TrendingUp, Activity, ArrowRight, Eye, EyeOff,
  ChevronDown, Check, Mail, Loader2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../App';

// ─── Theme constants ─────────────────────────────────────────────────────
const T = {
  heroBg:     'oklch(0.20 0 0)',          // gray hero background
  heroBg2:    'oklch(0.25 0 0)',          // slightly lighter for gradient end
  featuresBg: 'oklch(0.18 0 0)',          // slightly darker than hero
  cardGlass:  'rgba(255,255,255,0.05)',   // glass effect for dark sections
  cardBorder: 'rgba(255,255,255,0.09)',
  cardHover:  'rgba(255,255,255,0.10)',
  iconBg: [
    'linear-gradient(135deg, oklch(0.25 0 0), oklch(0.18 0 0))',
    'linear-gradient(135deg, oklch(0.28 0 0), oklch(0.20 0 0))',
    'linear-gradient(135deg, oklch(0.22 0 0), oklch(0.15 0 0))',
    'linear-gradient(135deg, oklch(0.30 0 0), oklch(0.22 0 0))',
    'linear-gradient(135deg, oklch(0.26 0 0), oklch(0.18 0 0))',
    'linear-gradient(135deg, oklch(0.24 0 0), oklch(0.16 0 0))',
  ],
};

// ─── Copy ─────────────────────────────────────────────────────────────────────
const copy = {
  en: {
    headline: 'Everything you need for',
    headlineHighlight: 'Medical Documentation',
    subtitle: 'Managing clinical documentation across multiple departments is time-consuming and error-prone. Avira automates the entire process — from patient data to compliant, structured documents in seconds.',
    features: [
      { icon: FileText, title: 'Smart Documentation',    desc: 'Auto-generate discharge letters, operation reports, and clinical forms from patient data in seconds.' },
      { icon: Globe,    title: 'Multi-Language Support', desc: 'Create documents in 50+ languages with region-specific compliance rules built in.' },
      { icon: BookOpen, title: 'Clinical Guidelines',    desc: 'AWMF, ICD-10 and specialty guidelines integrated directly into every generated document.' },
      { icon: Zap,      title: 'Automated Workflows',   desc: 'Connect to your KIS/EHR system and trigger document generation automatically on key clinical events.' },
      { icon: Shield,   title: 'Secure & Compliant',     desc: 'HIPAA and DSGVO/GDPR compliant. All data encrypted at rest and in transit.' },
      { icon: Network,  title: 'Multi-Entity Ready',     desc: 'Manage workflows across hospitals, clinics, and departments from a single platform.' },
    ],
    stats: [
      { icon: TrendingUp, value: '99.9%', label: 'Uptime SLA' },
      { icon: Shield,     value: 'HIPAA', label: 'Compliant' },
      { icon: Globe,      value: '50+',   label: 'Languages' },
      { icon: Activity,   value: 'Live',  label: 'Real-time sync' },
    ],
    ctaHeadline: 'Ready to simplify medical documentation?',
    ctaSubtitle: 'Start free — no credit card required. Up and running in minutes.',
    ctaButton: 'Get Started Free',
    continueWith: 'Continue with Microsoft',
    or: 'or',
    continueEmail: 'Continue with Email',
    emailLabel: 'Email address',
    emailPlaceholder: 'admin@avira.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••••••',
    signIn: 'Sign In',
    signingIn: 'Signing in…',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up',
    haveAccount: 'Already have an account?',
    signInLink: 'Sign in',
    magicLink: 'Send magic link',
    back: 'Back',
    invalidCredentials: 'Invalid email or password. Please try again.',
    scrollLabel: 'LEARN MORE',
    footerText: '© 2025 Avira Medical. All rights reserved.',
    terms: 'By signing in, you agree to our Terms of Service and Privacy Policy.',
    welcomeBack: 'Welcome back',
    signInTo: 'Sign in to your workspace',
  },
  de: {
    headline: 'Alles, was Sie brauchen für',
    headlineHighlight: 'Medizinische Dokumentation',
    subtitle: 'Klinische Dokumentation über mehrere Abteilungen hinweg ist zeitaufwändig und fehleranfällig. Avira automatisiert den gesamten Prozess — von Patientendaten zu konformen, strukturierten Dokumenten in Sekunden.',
    features: [
      { icon: FileText, title: 'Intelligente Dokumentation',  desc: 'Entlassbriefe, OP-Berichte und klinische Formulare aus Patientendaten in Sekunden generieren.' },
      { icon: Globe,    title: 'Mehrsprachige Unterstützung', desc: 'Dokumente in 50+ Sprachen mit eingebetteten regionalen Compliance-Regeln erstellen.' },
      { icon: BookOpen, title: 'Klinische Leitlinien',        desc: 'AWMF, ICD-10 und Fachleitlinien direkt in jedes generierte Dokument integriert.' },
      { icon: Zap,      title: 'Automatisierte Workflows',    desc: 'Mit Ihrem KIS/EHR-System verbinden und Dokumenterstellung automatisch auslösen.' },
      { icon: Shield,   title: 'Sicher & Konform',            desc: 'HIPAA- und DSGVO-konform. Alle Daten verschlüsselt im Ruhezustand und bei der Übertragung.' },
      { icon: Network,  title: 'Multi-Entität bereit',        desc: 'Workflows über Krankenhäuser, Kliniken und Abteilungen von einer Plattform aus verwalten.' },
    ],
    stats: [
      { icon: TrendingUp, value: '99,9%', label: 'Verfügbarkeit' },
      { icon: Shield,     value: 'DSGVO', label: 'Konform' },
      { icon: Globe,      value: '50+',   label: 'Sprachen' },
      { icon: Activity,   value: 'Live',  label: 'Echtzeit-Sync' },
    ],
    ctaHeadline: 'Bereit, die Dokumentation zu vereinfachen?',
    ctaSubtitle: 'Kostenlos starten — keine Kreditkarte erforderlich. In Minuten einsatzbereit.',
    ctaButton: 'Kostenlos starten',
    continueWith: 'Weiter mit Microsoft',
    or: 'oder',
    continueEmail: 'Weiter mit E-Mail',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'admin@avira.com',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••••••',
    signIn: 'Anmelden',
    signingIn: 'Wird angemeldet…',
    noAccount: 'Noch kein Konto?',
    signUpLink: 'Registrieren',
    haveAccount: 'Bereits ein Konto?',
    signInLink: 'Anmelden',
    magicLink: 'Magic-Link senden',
    back: 'Zurück',
    invalidCredentials: 'Ungültige E-Mail oder Passwort. Bitte erneut versuchen.',
    scrollLabel: 'MEHR ERFAHREN',
    footerText: '© 2025 Avira Medical. Alle Rechte vorbehalten.',
    terms: 'Mit der Anmeldung stimmen Sie unseren Nutzungsbedingungen und der Datenschutzerklärung zu.',
    welcomeBack: 'Willkommen zurück',
    signInTo: 'Melden Sie sich in Ihrem Workspace an',
  },
};

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
];

// ─── Language Switcher ────────────────────────────────────────────────────────
const LanguageSwitcher = ({ currentLang, onSwitch }) => {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.9)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        <Globe size={14} />
        <span>{current.flag} {current.name}</span>
        <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', opacity: 0.7 }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div
            className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
            style={{ minWidth: '150px', background: 'oklch(0.14 0 0)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { onSwitch(lang.code); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-left transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span>{lang.flag}</span>
                <span style={{ flex: 1 }}>{lang.name}</span>
                {lang.code === currentLang && <Check size={13} style={{ color: 'rgba(255,255,255,0.6)' }} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Logo Mark ────────────────────────────────────────────────────────────────
const LogoMark = ({ size = 64, dark = false }) => (
  <div
    style={{
      width: size, height: size,
      background: dark ? 'oklch(1 0 0)' : 'oklch(0.30 0 0)',
      borderRadius: Math.round(size * 0.28) + 'px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-serif)', fontWeight: '700',
      fontSize: Math.round(size * 0.42) + 'px',
      color: dark ? 'oklch(0.30 0 0)' : 'oklch(1 0 0)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      flexShrink: 0,
    }}
  >
    A
  </div>
);

// ─── Microsoft SVG ────────────────────────────────────────────────────────────
const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
    <rect x="1"  y="1"  width="9" height="9" fill="oklch(0.45 0 0)" />
    <rect x="11" y="1"  width="9" height="9" fill="oklch(0.35 0 0)" />
    <rect x="1"  y="11" width="9" height="9" fill="oklch(0.25 0 0)" />
    <rect x="11" y="11" width="9" height="9" fill="oklch(0.40 0 0)" />
  </svg>
);

// ─── Login Card ───────────────────────────────────────────────────────────────
const LoginCard = ({ c, lang }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState('initial');
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(c.invalidCredentials);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div
        className="shadow-2xl"
        style={{
          background: 'oklch(1 0 0)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid oklch(0.92 0 0)',
        }}
      >
        {/* Card Header */}
        <div className="text-center px-8 pt-8 pb-4 space-y-4">
          <div className="flex justify-center">
            <LogoMark size={64} dark={false} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-serif)' }}>
              {mode === 'initial' ? 'Avira Medical' : c.welcomeBack}
            </h2>
            <p className="mt-1" style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
              {mode === 'initial'
                ? (lang === 'de' ? 'Medizinischer Co-Pilot' : 'Medical Co-Pilot')
                : c.signInTo}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-8 pb-8">
          {mode === 'initial' ? (
            <>
              {/* Microsoft SSO Button */}
              <button
                className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 rounded-xl"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  marginBottom: '16px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'oklch(0.18 0 0)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}
                onClick={() => {}}
              >
                <MicrosoftIcon />
                {c.continueWith}
              </button>

              {/* Divider */}
              <div className="relative py-2 mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-3" style={{ background: 'oklch(1 0 0)', color: 'var(--muted-foreground)' }}>{c.or}</span>
                </div>
              </div>

              {/* Email button */}
              <button
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl font-medium transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--muted)'; e.currentTarget.style.borderColor = 'oklch(0.78 0 0)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                onClick={() => setMode('email')}
              >
                <Mail size={16} />
                {c.continueEmail}
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--foreground)', marginBottom: '6px' }}>
                  {c.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={c.emailPlaceholder}
                  required
                  autoComplete="email"
                  autoFocus
                  className="input h-11"
                  style={{ background: 'var(--input)', width: '100%' }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: error ? '12px' : '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--foreground)', marginBottom: '6px' }}>
                  {c.passwordLabel}
                  {authMode === 'signup' && (
                    <span style={{ color: 'var(--muted-foreground)', fontWeight: '400', marginLeft: '4px', fontSize: '12px' }}>
                      (min. 8 characters)
                    </span>
                  )}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={c.passwordPlaceholder}
                    required
                    autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                    className="input h-11"
                    style={{ paddingRight: '44px', background: 'var(--input)', width: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', padding: '2px' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ marginBottom: '16px', padding: '10px 14px', background: 'oklch(0.97 0.02 23)', border: '1px solid oklch(0.85 0.05 23)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--destructive)' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl font-medium transition-all"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  opacity: loading ? 0.75 : 1,
                  marginBottom: '16px',
                }}
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" />{c.signingIn}</>
                  : <>{c.signIn} <ArrowRight size={16} /></>}
              </button>

              {/* Auth mode toggle */}
              <p className="text-center text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                {authMode === 'signin' ? c.noAccount : c.haveAccount}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode(m => m === 'signin' ? 'signup' : 'signin')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: '500', fontFamily: 'var(--font-sans)', fontSize: '14px', textDecoration: 'underline' }}
                >
                  {authMode === 'signin' ? c.signUpLink : c.signInLink}
                </button>
              </p>

              {/* Divider */}
              <div className="relative py-2 mb-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-3" style={{ background: 'oklch(1 0 0)', color: 'var(--muted-foreground)' }}>{c.or}</span>
                </div>
              </div>

              {/* Magic link */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <Mail size={15} />{c.magicLink}
              </button>

              {/* Back */}
              <button
                type="button"
                className="w-full flex items-center justify-center text-sm mt-1 py-2 rounded-lg transition-all"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                onClick={() => { setMode('initial'); setError(''); }}
              >
                ← {c.back}
              </button>
            </form>
          )}

          {/* Terms */}
          <p className="text-xs text-center pt-4" style={{ color: 'var(--muted-foreground)' }}>
            {c.terms}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Login Page ──────────────────────────────────────────────────────────
const LoginPage = () => {
  const { lang, setLang } = useLanguage();
  const c = copy[lang] || copy.en;
  const featuresRef = useRef(null);

  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>

      {/* ═══ Hero Section ═══════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center p-6"
        style={{
          minHeight: '100vh',
          background: `linear-gradient(160deg, ${T.heroBg} 0%, ${T.heroBg2} 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full blur-3xl" style={{ top: '-10rem', right: '-10rem', width: '22rem', height: '22rem', background: 'rgba(255,255,255,0.03)' }} />
          <div className="absolute rounded-full blur-3xl" style={{ bottom: '-10rem', left: '-10rem', width: '22rem', height: '22rem', background: 'rgba(255,255,255,0.03)' }} />
        </div>

        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher currentLang={lang} onSwitch={setLang} />
        </div>

        {/* Login Card */}
        <LoginCard c={c} lang={lang} />

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 flex flex-col items-center gap-2"
          style={{ left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="text-sm font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
            {c.scrollLabel}
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" style={{ color: 'rgba(255,255,255,0.35)' }} />
        </button>
      </section>

      {/* ═══ Features Section ═══════════════════════════════════════════════ */}
      <section
        ref={featuresRef}
        className="py-24 px-6"
        style={{
          minHeight: '100vh',
          background: `linear-gradient(to bottom, ${T.featuresBg}, oklch(0.22 0 0))`,
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {c.stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: T.cardGlass, border: `1px solid ${T.cardBorder}` }}
                >
                  <Icon size={22} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <div className="text-3xl font-bold mb-1" style={{ color: 'oklch(1 0 0)', fontFamily: 'var(--font-serif)' }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: '1.15', fontFamily: 'var(--font-serif)', color: 'oklch(1 0 0)' }}
            >
              {c.headline}{' '}
              <span
                className="bg-gradient-to-r from-gray-200 to-white bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                {c.headlineHighlight}
              </span>
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {c.subtitle}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {c.features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 cursor-default"
                  style={{ background: T.cardGlass, border: `1px solid ${T.cardBorder}` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = T.cardHover;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = T.cardGlass;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0" style={{ width: '6rem', height: '6rem', background: 'linear-gradient(to bottom-left, rgba(255,255,255,0.04), transparent)', borderBottomLeftRadius: '80px' }} />
                  {/* Icon */}
                  <div
                    className="inline-flex p-4 rounded-xl mb-5"
                    style={{ background: T.iconBg[i], boxShadow: '0 2px 8px rgba(0,0,0,0.3)', position: 'relative', zIndex: 1 }}
                  >
                    <Icon size={26} style={{ color: 'rgba(255,255,255,0.85)', strokeWidth: 1.5 }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'oklch(1 0 0)', position: 'relative', zIndex: 1 }}>{feat.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}>{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div
              className="relative overflow-hidden rounded-3xl p-12 text-center"
              style={{ background: 'oklch(0.22 0 0)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute rounded-full blur-3xl" style={{ width: '14rem', height: '14rem', top: '-4rem', left: '-4rem', background: 'rgba(255,255,255,0.04)' }} />
                <div className="absolute rounded-full blur-3xl" style={{ width: '14rem', height: '14rem', bottom: '-4rem', right: '-4rem', background: 'rgba(255,255,255,0.04)' }} />
              </div>

              <div className="flex justify-center mb-6" style={{ position: 'relative', zIndex: 1 }}>
                <LogoMark size={60} dark={true} />
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'oklch(1 0 0)', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
                {c.ctaHeadline}
              </h3>
              <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}>
                {c.ctaSubtitle}
              </p>
              <button
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl shadow-lg transition-all"
                style={{
                  background: 'oklch(1 0 0)',
                  color: 'oklch(0.30 0 0)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  position: 'relative',
                  zIndex: 1,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.94 0 0)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'oklch(1 0 0)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Zap size={18} />
                {c.ctaButton}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-6xl mx-auto mt-24 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>{c.footerText}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
