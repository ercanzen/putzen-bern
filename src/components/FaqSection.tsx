import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

function FaqItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: React.Key }) {
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full py-6 md:py-8 text-left focus:outline-none group"
      >
        <span className="font-serif text-lg md:text-3xl group-hover:text-[#6F6F6F] transition-colors duration-300 pr-6">{question}</span>
        <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center flex-shrink-0 group-hover:border-black transition-colors duration-300 relative">
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }} 
            className="w-4 h-px bg-black absolute"
          />
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 90 }} 
            className="w-4 h-px bg-black absolute"
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-[#6F6F6F] text-lg leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = t.faq.items.map((item) => ({
    question: item.q,
    answer: item.a
  }));

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-white text-black border-t border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="w-full lg:w-1/3">
          <FadeUp>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1]">
              {t.faq.title1}<br /><em className="italic text-[#6F6F6F]">{t.faq.title2}</em>
            </h2>
            <p className="text-[#6F6F6F] mt-6 text-sm leading-relaxed max-w-xs">
              {t.faq.desc}
            </p>
          </FadeUp>
        </div>
        
        <div className="w-full lg:w-2/3">
          <FadeUp delay={0.2}>
            <div className="flex flex-col border-t border-black/10">
              {faqs.map((faq, index) => (
                <FaqItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
