import { useEffect } from 'react';
import { useLanguage } from '../i18n';

type Panel = 'datenschutz' | 'impressum' | null;

interface Props {
  open: Panel;
  onClose: () => void;
}

export function LegalModal({ open, onClose }: Props) {
  const { language: lang } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = {
    datenschutz: {
      de: {
        label: 'Datenschutz',
        title: 'Datenschutzerklärung',
        body: (
          <div className="space-y-4 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Verantwortliche Stelle:</strong> Putzen Reinigungsservice, Bern, Schweiz</p>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten ernst. Diese Website erhebt nur Daten, die für den Betrieb und die Kontaktaufnahme notwendig sind.</p>
            <p><strong>Erhobene Daten:</strong> Bei Kontaktanfragen speichern wir Name, E-Mail-Adresse und Nachrichteninhalt. Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>
            <p><strong>Cookies:</strong> Diese Website verwendet technisch notwendige Cookies sowie optionale Analyse-Cookies.</p>
            <p><strong>Ihre Rechte:</strong> Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontaktieren Sie uns unter hello@putzen.ch.</p>
          </div>
        ),
      },
      en: {
        label: 'Privacy',
        title: 'Privacy Policy',
        body: (
          <div className="space-y-4 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Controller:</strong> Putzen Reinigungsservice, Bern, Switzerland</p>
            <p>We take the protection of your personal data seriously. This website only collects data necessary for operation and contact.</p>
            <p><strong>Data collected:</strong> For contact requests we store name, email address and message content, used solely to process your request.</p>
            <p><strong>Your rights:</strong> Contact us at hello@putzen.ch to exercise your rights.</p>
          </div>
        ),
      },
      fr: {
        label: 'Confidentialité',
        title: 'Politique de confidentialité',
        body: (
          <div className="space-y-4 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Responsable:</strong> Putzen Reinigungsservice, Berne, Suisse</p>
            <p>Nous prenons la protection de vos données personnelles au sérieux.</p>
            <p><strong>Données collectées:</strong> Nom, e-mail et message – uniquement pour traiter votre demande.</p>
            <p><strong>Vos droits:</strong> Contactez-nous à hello@putzen.ch.</p>
          </div>
        ),
      },
      it: {
        label: 'Privacy',
        title: 'Informativa sulla privacy',
        body: (
          <div className="space-y-4 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Titolare:</strong> Putzen Reinigungsservice, Berna, Svizzera</p>
            <p>Prendiamo sul serio la protezione dei tuoi dati personali.</p>
            <p><strong>Dati raccolti:</strong> Nome, e-mail e messaggio – solo per elaborare la tua richiesta.</p>
            <p><strong>I tuoi diritti:</strong> Contattaci a hello@putzen.ch.</p>
          </div>
        ),
      },
    },
    impressum: {
      de: {
        label: 'Impressum',
        title: 'Impressum',
        body: (
          <div className="space-y-2 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Bern, Schweiz</p>
            <p>E-Mail: hello@putzen.ch</p>
            <p>Tel: +41 79 850 15 03</p>
            <p className="pt-4 text-xs text-[#6F6F6F]">Alle Angaben ohne Gewähr. Alle Rechte vorbehalten. © 2026 Putzen.</p>
          </div>
        ),
      },
      en: {
        label: 'Imprint',
        title: 'Imprint',
        body: (
          <div className="space-y-2 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Bern, Switzerland · hello@putzen.ch · +41 79 850 15 03</p>
            <p className="pt-4 text-xs text-[#6F6F6F]">All information without warranty. All rights reserved. © 2026 Putzen.</p>
          </div>
        ),
      },
      fr: {
        label: 'Mentions légales',
        title: 'Mentions légales',
        body: (
          <div className="space-y-2 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Berne, Suisse · hello@putzen.ch · +41 79 850 15 03</p>
            <p className="pt-4 text-xs text-[#6F6F6F]">Toutes informations sans garantie. © 2026 Putzen.</p>
          </div>
        ),
      },
      it: {
        label: 'Note legali',
        title: 'Note legali',
        body: (
          <div className="space-y-2 text-sm text-[#4A4F4B] leading-relaxed">
            <p><strong>Putzen Reinigungsservice</strong></p>
            <p>Berna, Svizzera · hello@putzen.ch · +41 79 850 15 03</p>
            <p className="pt-4 text-xs text-[#6F6F6F]">Tutte le informazioni senza garanzia. © 2026 Putzen.</p>
          </div>
        ),
      },
    },
  };

  const section = content[open];
  const l = lang in section ? lang : 'de';
  const { label, title, body } = section[l as keyof typeof section];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-white w-full sm:max-w-lg sm:rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-black/8 sticky top-0 bg-white">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F] font-medium mb-1">{label}</p>
            <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/6 transition-colors text-[#6F6F6F] hover:text-black"
            aria-label="Schliessen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="px-8 py-6">{body}</div>
      </div>
    </div>
  );
}
