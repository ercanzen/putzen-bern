import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
