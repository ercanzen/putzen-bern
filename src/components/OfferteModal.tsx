import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SWISS_PLZ } from '../data/swissPlz';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../i18n';

interface OfferteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Service = 'moving' | 'cleaning' | 'both' | '';
type Payer = 'self' | 'company' | 'social' | '';

const FLOORS = ['EG', '1. OG', '2. OG', '3. OG', '4. OG', '5. OG', '6. OG', '7. OG', '8. OG', '9. OG', '10. OG'];
const DE_CLEANING_TYPES = ['Endreinigung', 'Unterhaltsreinigung', 'Büroreinigung', 'Baureinigung', 'Fensterreinigung'];

const inputCls = 'w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/40 bg-white transition-colors placeholder:text-[#aaa]';
const selCls = 'w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/40 bg-white transition-colors appearance-none cursor-pointer';

function yesNo(cur: boolean | null, val: boolean) {
  return `flex-1 py-3 rounded-xl border text-xs font-medium transition-all ${cur === val ? 'bg-black text-white border-black' : 'bg-white text-[#6F6F6F] border-black/15 hover:border-black/40'}`;
}

function SelectArrow() {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#aaa]">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
  );
}

function AddressBlock({ label, street, onStreet, plz, onPlz, floor, onFloor, elevator, onElevator, liftYes, liftNo, plzNotFound, streetPlaceholder }: {
  label: string;
  street: string; onStreet: (v: string) => void;
  plz: string; onPlz: (v: string) => void;
  floor: string; onFloor: (v: string) => void;
  elevator: boolean | null; onElevator: (v: boolean) => void;
  liftYes: string; liftNo: string; plzNotFound: string; streetPlaceholder: string;
}) {
  const city = plz.length === 4 ? (SWISS_PLZ[plz] ?? '') : '';
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6F6F6F] mb-2">{label}</p>
      <div className="space-y-3 p-4 bg-white rounded-2xl border border-black/8">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input
              className={inputCls}
              placeholder="PLZ *"
              maxLength={4}
              value={plz}
              onChange={e => onPlz(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
            {city && <p className="text-xs text-black font-medium mt-1 pl-1">📍 {city}</p>}
            {plz.length === 4 && !city && <p className="text-xs text-[#aaa] mt-1 pl-1">{plzNotFound}</p>}
          </div>
          <div className="relative">
            <select className={selCls} value={floor} onChange={e => onFloor(e.target.value)}>
              {FLOORS.map(f => <option key={f}>{f}</option>)}
            </select>
            <SelectArrow />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => onElevator(true)} className={yesNo(elevator, true)}>{liftYes}</button>
            <button type="button" onClick={() => onElevator(false)} className={yesNo(elevator, false)}>{liftNo}</button>
          </div>
        </div>
        <input className={inputCls} placeholder={streetPlaceholder} value={street} onChange={e => onStreet(e.target.value)} />
      </div>
    </div>
  );
}

export function OfferteModal({ isOpen, onClose }: OfferteModalProps) {
  const { t } = useLanguage();
  const m = t.modal;

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reqError, setReqError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [service, setService] = useState<Service>('');
  // Step 2 – moving
  const [fromStreet, setFromStreet] = useState('');
  const [fromPlz, setFromPlz] = useState('');
  const [fromFloor, setFromFloor] = useState('EG');
  const [fromElevator, setFromElevator] = useState<boolean | null>(null);
  const [toStreet, setToStreet] = useState('');
  const [toPlz, setToPlz] = useState('');
  const [toFloor, setToFloor] = useState('EG');
  const [toElevator, setToElevator] = useState<boolean | null>(null);
  const [specialItems, setSpecialItems] = useState('');
  // Step 2 – cleaning
  const [cleaningAddress, setCleaningAddress] = useState('');
  const [cleaningPlz, setCleaningPlz] = useState('');
  const [cleaningFloor, setCleaningFloor] = useState('EG');
  const [cleaningElevator, setCleaningElevator] = useState<boolean | null>(null);
  const [cleaningTypeIdx, setCleaningTypeIdx] = useState(0);
  // Step 2 – common
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [rooms, setRooms] = useState('');
  const [area, setArea] = useState('');
  // Step 3
  const [payer, setPayer] = useState<Payer>('');
  const [companyName, setCompanyName] = useState('');
  // Step 4
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [remarks, setRemarks] = useState('');

  const reset = () => {
    setStep(1); setSubmitted(false); setReqError(false); setService('');
    setFromStreet(''); setFromPlz(''); setFromFloor('EG'); setFromElevator(null);
    setToStreet(''); setToPlz(''); setToFloor('EG'); setToElevator(null); setSpecialItems('');
    setCleaningAddress(''); setCleaningPlz(''); setCleaningFloor('EG'); setCleaningElevator(null);
    setCleaningTypeIdx(0); setDate(''); setTimeSlot(''); setRooms(''); setArea('');
    setPayer(''); setCompanyName('');
    setFirstName(''); setLastName(''); setPhone(''); setEmail(''); setRemarks('');
  };

  useEffect(() => {
    if (!isOpen) { setTimeout(reset, 300); }
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', fn);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const isMoving = service === 'moving' || service === 'both';
  const isCleaning = service === 'cleaning' || service === 'both';

  const step2Valid = (() => {
    if (!date || !rooms || !area) return false;
    if (isMoving && (!fromStreet || !fromPlz || fromElevator === null || !toStreet || !toPlz || toElevator === null)) return false;
    if (isCleaning && (!cleaningAddress || !cleaningPlz || cleaningElevator === null)) return false;
    return true;
  })();
  const step3Valid = payer !== '' && (payer !== 'company' || companyName.trim() !== '');
  const step4Valid = firstName.trim() !== '' && lastName.trim() !== '' && phone.trim() !== '' && email.trim() !== '';

  const canNext = step === 1 ? service !== '' : step === 2 ? step2Valid : step === 3 ? step3Valid : step4Valid;

  const handleSubmit = async () => {
    if (!step4Valid) return;
    setLoading(true);
    setReqError(false);
    try {
      const serviceLabel = service === 'moving' ? 'Umzug' : service === 'cleaning' ? 'Reinigung' : 'Umzug & Reinigung';
      const payload: Record<string, string> = {
        access_key: '164982b6-13ba-467a-88f1-781582a76c88',
        subject: `Neue Offerte-Anfrage – ${serviceLabel} – ${firstName} ${lastName}`,
        from_name: `${firstName} ${lastName}`,
        Dienstleistung: serviceLabel,
        Vorname: firstName,
        Nachname: lastName,
        Telefon: phone,
        'E-Mail': email,
        Datum: date,
        Zimmer: rooms,
        'Fläche (m²)': area,
        Kostenträger: payer === 'self' ? 'Selbst (Privat)' : payer === 'company' ? `Firma: ${companyName}` : 'Sozialamt',
      };
      if (timeSlot) payload['Uhrzeit'] = timeSlot;
      if (isMoving) {
        payload['Von-Adresse'] = `${fromStreet}, ${fromPlz}`;
        payload['Von-Etage'] = fromFloor;
        payload['Von-Lift'] = fromElevator ? 'Ja' : 'Nein';
        payload['Nach-Adresse'] = `${toStreet}, ${toPlz}`;
        payload['Nach-Etage'] = toFloor;
        payload['Nach-Lift'] = toElevator ? 'Ja' : 'Nein';
        if (specialItems) payload['Besonderes'] = specialItems;
      }
      if (isCleaning) {
        payload['Reinigungs-Adresse'] = `${cleaningAddress}, ${cleaningPlz}`;
        payload['Etage'] = cleaningFloor;
        payload['Lift'] = cleaningElevator ? 'Ja' : 'Nein';
        payload['Reinigungsart'] = DE_CLEANING_TYPES[cleaningTypeIdx];
      }
      if (remarks) payload['Bemerkungen'] = remarks;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        try { generatePDF(); } catch {}
      } else {
        setReqError(true);
      }
    } catch {
      setReqError(true);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const serviceLabel = service === 'moving' ? 'Umzug' : service === 'cleaning' ? 'Reinigung' : 'Umzug & Reinigung';
    const pageW = doc.internal.pageSize.getWidth();
    let y = 20;

    const line = (label: string, value: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(label, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30);
      doc.text(value || '—', 80, y);
      y += 7;
    };

    const section = (title: string) => {
      y += 4;
      doc.setFillColor(240, 240, 240);
      doc.rect(20, y - 4, pageW - 40, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30);
      doc.text(title.toUpperCase(), 22, y + 3);
      y += 12;
    };

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(0);
    doc.text('PUTZEN', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Offerte-Anfrage', 20, y + 8);
    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.text(new Date().toLocaleDateString('de-CH'), pageW - 20, y, { align: 'right' });
    y += 22;

    doc.setDrawColor(200);
    doc.line(20, y, pageW - 20, y);
    y += 10;

    section('Dienstleistung');
    line('Art', serviceLabel);

    section('Kontaktperson');
    line('Name', `${firstName} ${lastName}`);
    line('Telefon', phone);
    line('E-Mail', email);
    line('Kostenträger', payer === 'self' ? 'Selbst (Privat)' : payer === 'company' ? `Firma: ${companyName}` : 'Sozialamt');

    section('Objekt & Termin');
    line('Datum', date);
    if (timeSlot) line('Uhrzeit', timeSlot);
    line('Zimmer', rooms);
    line('Wohnfläche', `${area} m²`);

    if (isMoving) {
      section('Umzug');
      line('Von', `${fromStreet}, ${fromPlz}`);
      line('Von Etage', fromFloor);
      line('Von Lift', fromElevator ? 'Ja' : 'Nein');
      line('Nach', `${toStreet}, ${toPlz}`);
      line('Nach Etage', toFloor);
      line('Nach Lift', toElevator ? 'Ja' : 'Nein');
      if (specialItems) line('Besonderes', specialItems);
    }

    if (isCleaning) {
      section('Reinigung');
      line('Adresse', `${cleaningAddress}, ${cleaningPlz}`);
      line('Etage', cleaningFloor);
      line('Lift', cleaningElevator ? 'Ja' : 'Nein');
      line('Art', DE_CLEANING_TYPES[cleaningTypeIdx]);
    }

    if (remarks) {
      section('Bemerkungen');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30);
      const lines = doc.splitTextToSize(remarks, pageW - 40);
      doc.text(lines, 20, y);
    }

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(180);
      doc.line(20, 285, pageW - 20, 285);
      doc.text('Putzen Bern | hello@putzen.ch', 20, 290);
      doc.text(`Seite ${i} / ${totalPages}`, pageW - 20, 290, { align: 'right' });
    }

    const filename = `Offerte_${firstName}_${lastName}_${date || 'anfrage'}.pdf`;
    const pdfBase64 = doc.output('datauristring');

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx53zW-lACBTiOUPnnCCNsI4XHzTOxoeKnUC848LnxM9dqjI_0-z4rJoqcnnWZCDitJ/exec';
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          to: 'ercanzengin49@gmail.com',
          subject: `Neue Offerte-Anfrage – ${serviceLabel} – ${firstName} ${lastName}`,
          filename,
          pdf: pdfBase64,
          fields: {
            'Dienstleistung': serviceLabel,
            ...(isMoving && {
              'Von-Adresse': `${fromStreet}, ${fromPlz}`,
              'Von-Etage': fromFloor,
              'Von-Lift': fromElevator ? 'Ja' : 'Nein',
              'Nach-Adresse': `${toStreet}, ${toPlz}`,
              'Nach-Etage': toFloor,
              'Nach-Lift': toElevator ? 'Ja' : 'Nein',
              ...(specialItems && { 'Besonderes': specialItems }),
            }),
            ...(isCleaning && {
              'Reinigungs-Adresse': `${cleaningAddress}, ${cleaningPlz}`,
              'Etage': cleaningFloor,
              'Lift': cleaningElevator ? 'Ja' : 'Nein',
              'Reinigungsart': DE_CLEANING_TYPES[cleaningTypeIdx],
            }),
            'Datum': date,
            ...(timeSlot && { 'Uhrzeit': timeSlot }),
            'Zimmer': rooms,
            'Fläche': `${area} m²`,
            'Kostenträger': payer === 'self' ? 'Selbst' : payer === 'company' ? `Firma: ${companyName}` : 'Sozialamt',
            'Name': `${firstName} ${lastName}`,
            'Telefon': phone,
            'E-Mail': email,
            ...(remarks && { 'Bemerkungen': remarks }),
          },
        }),
      }).catch(() => {});

    doc.save(filename);
  };

  const svcBtn = (s: Service) =>
    `flex flex-col items-start p-5 rounded-2xl border-2 transition-all cursor-pointer text-left ${service === s ? 'border-black bg-black text-white' : 'border-black/15 bg-white text-black hover:border-black/30'}`;
  const payBtn = (p: Payer) =>
    `flex-1 py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${payer === p ? 'bg-black text-white border-black' : 'bg-white text-[#6F6F6F] border-black/15 hover:border-black/40'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-[#F9F9F9] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-black/8">
              <div>
                <p className="text-[11px] font-medium text-[#6F6F6F] uppercase tracking-widest mb-1">Putzen Bern</p>
                <h2 className="font-serif text-xl sm:text-2xl text-black">{m.title}</h2>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors text-[#6F6F6F] hover:text-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Step progress */}
            {!submitted && (
              <div className="flex items-center px-6 sm:px-8 py-3 border-b border-black/8 bg-white/60 gap-1">
                {m.steps.map((label, i) => {
                  const n = i + 1;
                  const done = n < step;
                  const active = n === step;
                  return (
                    <div key={label} className="flex items-center flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 transition-all ${done || active ? 'bg-black text-white' : 'bg-black/10 text-[#999]'}`}>
                          {done ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : n}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-medium truncate hidden sm:block ${active ? 'text-black' : done ? 'text-black/50' : 'text-[#bbb]'}`}>{label}</span>
                      </div>
                      {i < m.steps.length - 1 && (
                        <div className={`flex-1 h-px mx-2 flex-shrink-0 ${done ? 'bg-black' : 'bg-black/10'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-serif text-2xl text-black mb-3">{m.success_title}</h3>
                  <p className="text-[#6F6F6F] text-sm leading-relaxed max-w-xs">{m.success_msg}</p>
                  <button onClick={onClose} className="mt-8 bg-black text-white rounded-full px-8 py-3 text-sm font-medium hover:scale-105 transition-transform">{m.close}</button>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {/* ── Step 1 ── */}
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                      <p className="text-sm text-[#6F6F6F] mb-5">{m.step1_q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          { val: 'moving' as Service, label: m.svc_moving, icon: '🚚', sub: m.svc_moving_sub },
                          { val: 'cleaning' as Service, label: m.svc_cleaning, icon: '🧹', sub: m.svc_cleaning_sub },
                          { val: 'both' as Service, label: m.svc_both, icon: '✨', sub: m.svc_both_sub },
                        ]).map(({ val, label, icon, sub }) => (
                          <button key={val} type="button" onClick={() => setService(val)} className={svcBtn(val)}>
                            <span className="text-2xl mb-3 block">{icon}</span>
                            <span className="font-semibold text-sm leading-tight block">{label}</span>
                            <span className={`text-xs mt-1 leading-tight block ${service === val ? 'text-white/65' : 'text-[#6F6F6F]'}`}>{sub}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2 ── */}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                      <div className="space-y-5">
                        {isMoving && (
                          <>
                            <AddressBlock
                              label={m.addr_from}
                              street={fromStreet} onStreet={setFromStreet}
                              plz={fromPlz} onPlz={setFromPlz}
                              floor={fromFloor} onFloor={setFromFloor}
                              elevator={fromElevator} onElevator={setFromElevator}
                              liftYes={m.lift_yes} liftNo={m.lift_no}
                              plzNotFound={m.plz_not_found} streetPlaceholder={m.street_placeholder}
                            />
                            <AddressBlock
                              label={m.addr_to}
                              street={toStreet} onStreet={setToStreet}
                              plz={toPlz} onPlz={setToPlz}
                              floor={toFloor} onFloor={setToFloor}
                              elevator={toElevator} onElevator={setToElevator}
                              liftYes={m.lift_yes} liftNo={m.lift_no}
                              plzNotFound={m.plz_not_found} streetPlaceholder={m.street_placeholder}
                            />
                          </>
                        )}

                        {isCleaning && (
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6F6F6F] mb-2">{m.addr_cleaning}</p>
                            <div className="space-y-3 p-4 bg-white rounded-2xl border border-black/8">
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <input
                                    className={inputCls}
                                    placeholder="PLZ *"
                                    maxLength={4}
                                    value={cleaningPlz}
                                    onChange={e => setCleaningPlz(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                  />
                                  {cleaningPlz.length === 4 && SWISS_PLZ[cleaningPlz] && (
                                    <p className="text-xs text-black font-medium mt-1 pl-1">📍 {SWISS_PLZ[cleaningPlz]}</p>
                                  )}
                                  {cleaningPlz.length === 4 && !SWISS_PLZ[cleaningPlz] && (
                                    <p className="text-xs text-[#aaa] mt-1 pl-1">{m.plz_not_found}</p>
                                  )}
                                </div>
                                <div className="relative">
                                  <select className={selCls} value={cleaningFloor} onChange={e => setCleaningFloor(e.target.value)}>
                                    {FLOORS.map(f => <option key={f}>{f}</option>)}
                                  </select>
                                  <SelectArrow />
                                </div>
                                <div className="flex gap-2">
                                  <button type="button" onClick={() => setCleaningElevator(true)} className={yesNo(cleaningElevator, true)}>{m.lift_yes}</button>
                                  <button type="button" onClick={() => setCleaningElevator(false)} className={yesNo(cleaningElevator, false)}>{m.lift_no}</button>
                                </div>
                              </div>
                              <input className={inputCls} placeholder={m.street_placeholder} value={cleaningAddress} onChange={e => setCleaningAddress(e.target.value)} />
                              <div className="relative">
                                <select className={selCls} value={cleaningTypeIdx} onChange={e => setCleaningTypeIdx(Number(e.target.value))}>
                                  {m.cleaning_types.map((ct, i) => <option key={i} value={i}>{ct}</option>)}
                                </select>
                                <SelectArrow />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Date + Time */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-[#6F6F6F] mb-1 block">{m.date_label}</label>
                            <input type="date" className={inputCls} value={date} onChange={e => setDate(e.target.value)} />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#6F6F6F] mb-1 block">{m.time_label}</label>
                            <input type="time" className={inputCls} value={timeSlot} onChange={e => setTimeSlot(e.target.value)} />
                          </div>
                        </div>

                        {/* Rooms + Area */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-[#6F6F6F] mb-1 block">{m.rooms_label}</label>
                            <input type="number" min="1" max="20" className={inputCls} placeholder="3" value={rooms} onChange={e => setRooms(e.target.value)} />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#6F6F6F] mb-1 block">{m.area_label}</label>
                            <input type="number" min="10" className={inputCls} placeholder="75" value={area} onChange={e => setArea(e.target.value)} />
                          </div>
                        </div>

                        {isMoving && (
                          <input className={inputCls} placeholder={m.special_placeholder} value={specialItems} onChange={e => setSpecialItems(e.target.value)} />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 3 ── */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                      <p className="text-sm text-[#6F6F6F] mb-5">{m.step3_q}</p>
                      <div className="flex gap-3 mb-5">
                        {([
                          { val: 'self' as Payer, label: m.payer_self },
                          { val: 'company' as Payer, label: m.payer_company },
                          { val: 'social' as Payer, label: m.payer_social },
                        ]).map(({ val, label }) => (
                          <button key={val} type="button" onClick={() => setPayer(val)} className={payBtn(val)}>{label}</button>
                        ))}
                      </div>
                      <AnimatePresence>
                        {payer === 'company' && (
                          <motion.div key="company" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                            <input className={inputCls} placeholder={m.company_placeholder} value={companyName} onChange={e => setCompanyName(e.target.value)} />
                          </motion.div>
                        )}
                        {payer === 'social' && (
                          <motion.div key="social" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                            <p className="text-sm text-amber-800 leading-relaxed">
                              <strong>{m.social_note_bold}</strong> {m.social_note}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ── Step 4 ── */}
                  {step === 4 && (
                    <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input className={inputCls} placeholder={m.firstname} value={firstName} onChange={e => setFirstName(e.target.value)} />
                          <input className={inputCls} placeholder={m.lastname} value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <input type="tel" className={inputCls} placeholder={m.phone} value={phone} onChange={e => setPhone(e.target.value)} />
                        <input type="email" className={inputCls} placeholder={m.email} value={email} onChange={e => setEmail(e.target.value)} />
                        <textarea className={`${inputCls} resize-none`} rows={3} placeholder={m.remarks} value={remarks} onChange={e => setRemarks(e.target.value)} />
                        {reqError && (
                          <p className="text-red-500 text-sm">{m.error}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-black/8 bg-white/60">
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 1}
                  className="text-sm font-medium text-[#6F6F6F] hover:text-black transition-colors disabled:opacity-0 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  {m.back}
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canNext}
                    className="bg-black text-white rounded-full px-7 py-2.5 text-sm font-medium hover:scale-105 transition-all disabled:opacity-35 disabled:scale-100 flex items-center gap-1.5"
                  >
                    {m.next}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!step4Valid || loading}
                    className="bg-black text-white rounded-full px-7 py-2.5 text-sm font-medium hover:scale-105 transition-all disabled:opacity-35 disabled:scale-100"
                  >
                    {loading ? m.sending : m.submit}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
