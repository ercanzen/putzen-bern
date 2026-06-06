import { useState } from 'react';
import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

type ServiceType = 'cleaning' | 'moving' | 'both';

export function PriceCalculatorSection() {
  const { t } = useLanguage();
  const [service, setService] = useState<ServiceType>('cleaning');
  const [rooms, setRooms] = useState<number>(3);
  const [sqm, setSqm] = useState<number>(80);
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = () => {
    // Very simple dummy calculation logic
    let base = 0;
    
    // Base cleaning cost: 200 + 8 * sqm + 50 * rooms
    if (service === 'cleaning' || service === 'both') {
      base += 200 + (sqm * 8) + (rooms * 50);
    }
    
    // Base moving cost: 300 + 10 * sqm + 100 * rooms
    if (service === 'moving' || service === 'both') {
      base += 300 + (sqm * 10) + (rooms * 100);
    }
    
    setEstimate(Math.round(base / 10) * 10); // Round to nearest 10
  };

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-black/5" id="calculator">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <div className="lg:w-5/12 flex flex-col justify-center">
          <FadeUp>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.9] mb-8">
              {t.calculator.title1}<br />
              <em className="italic text-[#6F6F6F]">{t.calculator.title2}</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-base md:text-lg text-[#6F6F6F] leading-relaxed max-w-md">
              {t.calculator.desc}
            </p>
          </FadeUp>
        </div>

        <div className="lg:w-7/12">
          <FadeUp delay={0.2} className="bg-[#F7F7F7] rounded-[2rem] p-8 md:p-12 shadow-sm border border-black/5">
            <div className="flex flex-col gap-8">
              
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium mb-4 text-[#000000]">{t.calculator.service_label}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['cleaning', 'moving', 'both'] as ServiceType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setService(type)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                        service === type 
                          ? 'bg-black text-white border-black shadow-md' 
                          : 'bg-white text-[#6F6F6F] border-transparent hover:border-black/20'
                        }`}
                    >
                      {type === 'cleaning' && t.calculator.service_cleaning}
                      {type === 'moving' && t.calculator.service_moving}
                      {type === 'both' && t.calculator.service_both}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-[#000000]">{t.calculator.rooms_label}</label>
                    <span className="text-sm font-serif font-medium">{rooms}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.5" 
                    value={rooms}
                    onChange={(e) => setRooms(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-[#000000]">{t.calculator.sqm_label}</label>
                    <span className="text-sm font-serif font-medium">{sqm}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="300" 
                    step="5" 
                    value={sqm}
                    onChange={(e) => setSqm(parseInt(e.target.value))}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <button 
                  onClick={calculateEstimate}
                  className="bg-black text-white px-8 py-4 rounded-full text-sm font-medium hover:scale-[1.02] transition-transform duration-300 shadow-lg"
                >
                  {t.calculator.calculate_btn}
                </button>

                {estimate !== null && (
                  <div className="flex flex-col md:items-end animate-fade-rise">
                    <span className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-1">{t.calculator.estimate_title}</span>
                    <span className="font-serif text-4xl tracking-tight">~ {estimate} <span className="text-lg text-[#6F6F6F] font-sans"> {t.calculator.chf}</span></span>
                  </div>
                )}
              </div>
              
              {estimate !== null && (
                <p className="text-xs text-[#6F6F6F]/70 italic animate-fade-rise text-center md:text-left">
                  {t.calculator.estimate_disclaimer}
                </p>
              )}

            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
