import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../i18n/context';
import { useCountUp } from '../hooks/useCountUp';

interface StatCardProps {
  value: string;
  numberTarget?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, numberTarget, suffix = '', prefix = '', label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(numberTarget || 0, 2200, true, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative group p-8 sm:p-10 rounded-3xl bg-[#0F1D38]/60 backdrop-blur-xl border border-white/5 hover:border-[#FF5E3A]/40 transition-all duration-500 text-center flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(255,94,58,0.1)]"
    >
      {/* Background Soft Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#2A4073]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <span className="block text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white tracking-tight mb-3 text-gradient-accent">
          {numberTarget !== undefined ? `${prefix}${count}${suffix}` : value}
        </span>
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 font-heading">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

export const Statistics: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '6+', numberTarget: 6, suffix: '+', label: 'Years of Experience' },
    { value: '99%', numberTarget: 99, suffix: '%', label: 'Client Satisfaction' },
    { value: '50+', numberTarget: 50, suffix: '+', label: 'Completed Projects' },
    { value: '5–20 Days', label: 'Average Delivery Time' },
  ];

  return (
    <section className="py-20 relative bg-[#091224] border-t border-white/5 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2A4073]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              value={stat.value}
              numberTarget={stat.numberTarget}
              suffix={stat.suffix}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
