import { useEffect, useRef, useState } from 'react'

/* ─── Video ─── */
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'
const FADE_DUR = 0.5

/* ─── i18n ─── */
type Lang = 'de' | 'en' | 'fr' | 'it'

const T: Record<Lang, Record<string, string>> = {
  de: {
    badge: 'Bern & Umgebung', since: 'Seit 2016',
    h1a: 'Ihr Zuhause.', h1b: 'Strahlend', h1c: 'sauber.',
    desc: 'Professionelle Reinigungsdienstleistungen mit Herz – zuverlässig, gründlich und nach Ihren Wünschen.',
    cta: 'Kostenlos anfragen', learn: 'Leistungen ansehen',
    s_clients: 'Kunden', s_years: 'Jahre', s_guarantee: 'Garantie',
    nav_s: 'Leistungen', nav_p: 'Preise', nav_a: 'Über uns', nav_c: 'Kontakt', nav_q: 'Anfragen',
    b1: '5-Sterne Google', b2: 'Eco-zertifiziert', b3: 'Versichert',
  },
  en: {
    badge: 'Bern & Surroundings', since: 'Since 2016',
    h1a: 'Your home.', h1b: 'Brilliantly', h1c: 'clean.',
    desc: 'Professional cleaning services with heart – reliable, thorough and tailored to your needs.',
    cta: 'Get a free quote', learn: 'View services',
    s_clients: 'Customers', s_years: 'Years', s_guarantee: 'Guarantee',
    nav_s: 'Services', nav_p: 'Pricing', nav_a: 'About', nav_c: 'Contact', nav_q: 'Get Quote',
    b1: '5-Star Google', b2: 'Eco-certified', b3: 'Insured',
  },
  fr: {
    badge: 'Berne & environs', since: 'Depuis 2016',
    h1a: 'Votre maison.', h1b: 'Impeccablement', h1c: 'propre.',
    desc: 'Services de nettoyage professionnels – fiables, minutieux et adaptés à vos besoins.',
    cta: 'Devis gratuit', learn: 'Voir les services',
    s_clients: 'Clients', s_years: 'Ans', s_guarantee: 'Garantie',
    nav_s: 'Services', nav_p: 'Tarifs', nav_a: 'À propos', nav_c: 'Contact', nav_q: 'Devis',
    b1: '5 étoiles Google', b2: 'Éco-certifié', b3: 'Assuré',
  },
  it: {
    badge: 'Berna & dintorni', since: 'Dal 2016',
    h1a: 'La vostra casa.', h1b: 'Splendidamente', h1c: 'pulita.',
    desc: 'Servizi di pulizia professionali – affidabili, accurati e su misura per voi.',
    cta: 'Preventivo gratuito', learn: 'Vedi i servizi',
    s_clients: 'Clienti', s_years: 'Anni', s_guarantee: 'Garanzia',
    nav_s: 'Servizi', nav_p: 'Prezzi', nav_a: 'Chi siamo', nav_c: 'Contatto', nav_q: 'Preventivo',
    b1: '5 stelle Google', b2: 'Eco-certificato', b3: 'Assicurato',
  },
}

/* ─── Shared style tokens ─── */
const GREEN     = '#22c55e'
const GREEN_BR  = '#4ade80'
const BG_DARK   = '#040d04'
const T1        = '#ffffff'
const T2        = 'rgba(255,255,255,0.58)'
const T3        = 'rgba(255,255,255,0.28)'
const BORDER_D  = 'rgba(255,255,255,0.08)'
const BORDER_G  = 'rgba(74,222,128,0.22)'
const PILL_BG   = 'rgba(255,255,255,0.04)'
const BACKDROP  = 'blur(18px)'

/* ─── Sub-components ─── */
function Badge({ emoji, text, cls = '' }: { emoji: string; text: string; cls?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap ${cls}`}
      style={{ background: 'rgba(4,13,4,0.88)', border: `1px solid ${BORDER_G}`, backdropFilter: BACKDROP, color: T1, boxShadow: '0 4px 28px rgba(0,0,0,0.4)' }}>
      <span>{emoji}</span><span>{text}</span>
    </div>
  )
}

function StatItem({ value, label, gold = false, last = false }: { value: string; label: string; gold?: boolean; last?: boolean }) {
  return (
    <div className="flex flex-col px-5 py-4" style={{ borderRight: last ? 'none' : `1px solid ${BORDER_D}` }}>
      <span className="font-extrabold leading-none" style={{ fontFamily: '"Syne", sans-serif', letterSpacing: '-0.04em', color: gold ? '#fbbf24' : T1, fontSize: gold ? '0.9rem' : '1.55rem' }}>
        {value}
      </span>
      <span className="text-xs mt-1.5 uppercase tracking-widest font-medium" style={{ color: T3 }}>
        {label}
      </span>
    </div>
  )
}

/* ─── Main Component ─── */
export default function App() {
  const [lang, setLang] = useState<Lang>('de')
  const videoRef = useRef<HTMLVideoElement>(null)
  const t = T[lang]

  /* Video fade-in / fade-out loop */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let raf: number
    let alive = true

    const tick = () => {
      if (!alive) return
      if (video.duration && !video.paused && !video.ended) {
        const { currentTime: ct, duration: d } = video
        video.style.opacity =
          ct < FADE_DUR          ? String(ct / FADE_DUR) :
          d - ct < FADE_DUR      ? String((d - ct) / FADE_DUR) : '1'
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => { if (alive) { video.currentTime = 0; video.play().catch(() => {}) } }, 100)
    }

    video.addEventListener('ended', onEnded)
    video.play().catch(() => {})
    raf = requestAnimationFrame(tick)

    return () => { alive = false; cancelAnimationFrame(raf); video.removeEventListener('ended', onEnded) }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: BG_DARK, fontFamily: '"Outfit", system-ui, sans-serif' }}>

      {/* ── Ambient light glows ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="drift-glow absolute rounded-full" style={{ width: 800, height: 800, top: -300, left: -200, background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 65%)' }} />
        <div className="absolute rounded-full" style={{ width: 600, height: 600, bottom: 0, right: -100, background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)', animation: 'drift-glow 18s ease-in-out infinite alternate-reverse' }} />
      </div>

      {/* ── Noise texture ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")" }} />

      {/* ── Ghost "GLANZ" watermark ── */}
      <div className="pointer-events-none absolute z-0 select-none" aria-hidden
        style={{ right: '-2%', top: '50%', transform: 'translateY(-50%)', fontFamily: '"Syne", sans-serif', fontSize: 'clamp(8rem, 20vw, 22rem)', fontWeight: 800, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(74,222,128,0.055)', lineHeight: 1, whiteSpace: 'nowrap' }}>
        GLANZ
      </div>

      {/* ── Video background ── */}
      <div className="absolute z-0" style={{ top: 320, right: 0, bottom: 0, left: 0 }}>
        <video ref={videoRef} src={VIDEO_URL} className="w-full h-full object-cover" style={{ opacity: 0 }} muted playsInline />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${BG_DARK}, transparent 28%, transparent 72%, ${BG_DARK})` }} />
      </div>

      {/* ── Particle-like dots overlay (CSS-only) ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden
        style={{ backgroundImage: 'radial-gradient(rgba(74,222,128,0.055) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* ════════════════════════
          NAVIGATION
          ════════════════════════ */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0 select-none">
            <span style={{ color: GREEN, fontSize: '1.5rem', lineHeight: 1 }}>✦</span>
            <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: '1.15rem', color: T1, letterSpacing: '-0.02em' }}>
              BernGlanz
            </span>
          </a>

          {/* Nav pill */}
          <div className="hidden md:flex items-center gap-0 rounded-full px-1.5 py-1.5"
            style={{ background: PILL_BG, border: `1px solid ${BORDER_D}`, backdropFilter: BACKDROP }}>
            {[
              { label: t.nav_s, href: '#services' },
              { label: t.nav_p, href: '#pricing' },
              { label: t.nav_a, href: '#about' },
              { label: t.nav_c, href: '#contact' },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors hover:text-white"
                style={{ color: T2 }}>
                {label}
              </a>
            ))}
            <a href="#contact" className="ml-1 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #16a34a)` }}>
              {t.nav_q}
            </a>
          </div>

          {/* Language switcher */}
          <div className="flex gap-0.5 shrink-0">
            {(['de', 'en', 'fr', 'it'] as Lang[]).map(code => (
              <button key={code} onClick={() => setLang(code)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer"
                style={{
                  fontFamily: 'inherit',
                  background: lang === code ? 'rgba(34,197,94,0.10)' : 'transparent',
                  border: lang === code ? `1px solid ${BORDER_G}` : '1px solid transparent',
                  color: lang === code ? GREEN_BR : T3,
                }}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ════════════════════════
          HERO
          ════════════════════════ */}
      <section className="relative z-10 px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto grid items-center gap-14" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* ── Left: Content ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <div className="animate-fade-rise self-start flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: 'rgba(34,197,94,0.07)', border: `1px solid ${BORDER_G}`, color: GREEN_BR }}>
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: GREEN, display: 'inline-block', flexShrink: 0 }} />
              {t.badge}
              <span style={{ opacity: 0.3 }}>·</span>
              {t.since}
            </div>

            {/* H1 */}
            <h1 className="animate-fade-rise font-extrabold text-white mb-6"
              style={{ fontFamily: '"Syne", sans-serif', fontSize: 'clamp(3rem, 5.5vw, 6.2rem)', lineHeight: 1.0, letterSpacing: '-0.055em' }}>
              <span style={{ display: 'block' }}>{t.h1a}</span>
              <span style={{ display: 'block' }}>
                {t.h1b}{' '}
                <span style={{ background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 55%, #86efac 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t.h1c}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-rise-delay mb-9 leading-relaxed"
              style={{ color: T2, fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', maxWidth: 420 }}>
              {t.desc}
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-rise-delay flex gap-3 flex-wrap mb-11">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #15803d 100%)', boxShadow: '0 8px 32px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                {t.cta}
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-transform hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.85)', border: `1px solid ${BORDER_D}`, backdropFilter: 'blur(8px)' }}>
                {t.learn}
              </a>
            </div>

            {/* Stats bar */}
            <div className="animate-fade-rise-delay-2 inline-flex rounded-2xl overflow-hidden self-start"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER_D}`, backdropFilter: 'blur(20px)' }}>
              <StatItem value="500+" label={t.s_clients} />
              <StatItem value="8"    label={t.s_years} />
              <StatItem value="100%" label={t.s_guarantee} />
              <StatItem value="★★★★★" label="Google" gold last />
            </div>
          </div>

          {/* ── Right: Character ── */}
          <div className="relative" style={{ height: 580 }}>

            {/* Divider line */}
            <div className="absolute pointer-events-none" style={{ left: -28, top: '15%', bottom: '15%', width: 1, background: 'linear-gradient(to bottom, transparent, rgba(34,197,94,0.18), transparent)' }} />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(rgba(74,222,128,0.11) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(ellipse 88% 88% at 55% 50%, black 30%, transparent 68%)',
              WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 55% 50%, black 30%, transparent 68%)',
            }} />

            {/* Glow orb */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-full" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(34,197,94,0.13) 0%, rgba(59,130,246,0.07) 45%, transparent 70%)' }} />
            </div>

            {/* Character image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/hero-char.png"
                alt="BernGlanz Reinigungsprofi"
                className="float-a relative z-10 w-full object-contain"
                style={{ maxWidth: 420, filter: 'drop-shadow(0 0 48px rgba(34,197,94,0.22)) drop-shadow(0 0 96px rgba(59,130,246,0.10))' }}
              />
            </div>

            {/* Floating badges */}
            <div className="absolute z-20 float-b animate-fade-rise-delay" style={{ top: '8%', right: '4%' }}>
              <Badge emoji="⭐" text={t.b1} />
            </div>
            <div className="absolute z-20 float-c animate-fade-rise-delay-2" style={{ bottom: '28%', left: '-4%' }}>
              <Badge emoji="🌿" text={t.b2} />
            </div>
            <div className="absolute z-20 float-a animate-fade-rise-delay-3" style={{ top: '52%', right: '-2%' }}>
              <Badge emoji="✓" text={t.b3} />
            </div>
          </div>

        </div>
      </section>

      {/* ── Scroll cue ── */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-8" style={{ color: T3 }}>
        <div className="flex items-center justify-center rounded-xl" style={{ width: 22, height: 34, border: '1.5px solid rgba(255,255,255,0.2)' }}>
          <div className="rounded-sm" style={{ width: 3, height: 7, background: GREEN, animation: 'float-b 2s ease-in-out infinite' }} />
        </div>
        <span className="text-xs tracking-widest uppercase font-medium" style={{ letterSpacing: '0.14em' }}>Scrollen</span>
      </div>

    </div>
  )
}
