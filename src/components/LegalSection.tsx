import { useLanguage } from '../i18n';

export function LegalSection() {
  const { language: lang } = useLanguage();

  const de = (
    <>
      <section id="datenschutz" className="py-24 px-6 md:px-12 bg-white border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Datenschutz</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Datenschutzerklärung</h2>
          <div className="prose prose-sm text-[#4A4F4B] leading-relaxed space-y-4">
            <p><strong>Verantwortliche Stelle:</strong> Putzen Reinigungsservice, Bern, Schweiz</p>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Diese Website erhebt nur Daten, die für den Betrieb und die Kontaktaufnahme notwendig sind.</p>
            <p><strong>Erhobene Daten:</strong> Bei Kontaktanfragen speichern wir Name, E-Mail-Adresse und Nachrichteninhalt. Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>
            <p><strong>Cookies:</strong> Diese Website verwendet technisch notwendige Cookies sowie optionale Analyse-Cookies. Durch Klicken auf «Akzeptieren» stimmen Sie der Verwendung aller Cookies zu.</p>
            <p><strong>Ihre Rechte:</strong> Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Kontaktieren Sie uns unter hello@putzen.ch.</p>
          </div>
        </div>
      </section>

      <section id="impressum" className="py-24 px-6 md:px-12 bg-[#F9F9F9] border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Impressum</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Impressum</h2>
          <div className="text-[#4A4F4B] leading-relaxed space-y-2 text-sm">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Bern, Schweiz</p>
            <p>E-Mail: hello@putzen.ch</p>
            <p>Tel: +41 79 850 15 03</p>
            <p className="pt-4 text-xs text-[#6F6F6F]">Alle Angaben ohne Gewähr. Alle Rechte vorbehalten. © 2026 Putzen.</p>
          </div>
        </div>
      </section>
    </>
  );

  const fr = (
    <>
      <section id="datenschutz" className="py-24 px-6 md:px-12 bg-white border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Confidentialité</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Politique de confidentialité</h2>
          <div className="text-[#4A4F4B] leading-relaxed space-y-4 text-sm">
            <p><strong>Responsable:</strong> Putzen Reinigungsservice, Berne, Suisse</p>
            <p>Nous prenons la protection de vos données personnelles au sérieux. Ce site ne collecte que les données nécessaires au fonctionnement et à la prise de contact.</p>
            <p><strong>Données collectées:</strong> Lors des demandes de contact, nous enregistrons le nom, l'adresse e-mail et le contenu du message.</p>
            <p><strong>Vos droits:</strong> Contactez-nous à hello@putzen.ch pour exercer vos droits.</p>
          </div>
        </div>
      </section>
      <section id="impressum" className="py-24 px-6 md:px-12 bg-[#F9F9F9] border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Mentions légales</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Mentions légales</h2>
          <div className="text-[#4A4F4B] leading-relaxed space-y-2 text-sm">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Berne, Suisse · hello@putzen.ch · +41 79 850 15 03</p>
          </div>
        </div>
      </section>
    </>
  );

  const en = (
    <>
      <section id="datenschutz" className="py-24 px-6 md:px-12 bg-white border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Privacy</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Privacy Policy</h2>
          <div className="text-[#4A4F4B] leading-relaxed space-y-4 text-sm">
            <p><strong>Controller:</strong> Putzen Reinigungsservice, Bern, Switzerland</p>
            <p>We take the protection of your personal data seriously. This website only collects data necessary for operation and contact.</p>
            <p><strong>Your rights:</strong> Contact us at hello@putzen.ch to exercise your rights.</p>
          </div>
        </div>
      </section>
      <section id="impressum" className="py-24 px-6 md:px-12 bg-[#F9F9F9] border-t border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6F6F] mb-4">Imprint</p>
          <h2 className="font-display text-[2.5rem] leading-tight tracking-tight mb-8">Imprint</h2>
          <div className="text-[#4A4F4B] leading-relaxed space-y-2 text-sm">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Bern, Switzerland · hello@putzen.ch · +41 79 850 15 03</p>
          </div>
        </div>
      </section>
    </>
  );

  return lang === 'fr' ? fr : lang === 'en' ? en : de;
}
