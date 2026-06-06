import { useState, type FormEvent } from 'react';
import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function ContactFormSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const emailVal = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const message = formData.get('message') as string;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '164982b6-13ba-467a-88f1-781582a76c88',
          subject: `Neue Kontaktanfrage – ${name}`,
          from_name: name,
          Name: name,
          'E-Mail': emailVal,
          ...(phone && { Telefon: phone }),
          Nachricht: message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-black" id="kontakt-form">

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* NOISE */}
      <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-end">
        <div className="max-w-lg w-full">
          <FadeUp>
            <div className="mb-8">
              <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-[0.9] mb-4 text-white">
                {t.contact_form.title1}
                <em className="italic text-[#ffddb3]">{t.contact_form.title2}</em>
              </h2>
              <p className="text-sm text-white/60">
                {t.contact_form.desc}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-md p-7 rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">{t.contact_form.name}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 outline-none focus:border-white/50 transition-colors text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">{t.contact_form.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 outline-none focus:border-white/50 transition-colors text-white text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+41 79 000 00 00"
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 outline-none focus:border-white/50 transition-colors text-white text-sm placeholder:text-white/30"
                />
              </div>

              <div className="mb-5">
                <label className="block text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">{t.contact_form.message}</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 outline-none focus:border-white/50 transition-colors resize-none text-white text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#ffddb3] text-[#1a140f] px-8 py-3 rounded-full text-sm font-medium hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-[#1a140f]/30 border-t-[#1a140f] rounded-full animate-spin" />
                ) : (
                  t.contact_form.submit
                )}
              </button>

              {success && (
                <p className="mt-4 text-sm text-white font-medium bg-white/10 px-4 py-3 rounded-lg text-center animate-fade-rise">
                  ✓ {t.contact_form.success}
                </p>
              )}
              {error && (
                <p className="mt-4 text-sm text-red-300 font-medium bg-red-500/10 px-4 py-3 rounded-lg text-center animate-fade-rise">
                  {t.contact_form.error}
                </p>
              )}
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
