import React from 'react';
import { formatDisplayNumber } from '../lib/calculator';

export default function Screen({ current, previous }) {
  const rawValue = current != null ? current : (previous != null ? previous : '0');
  const formatted = formatDisplayNumber(rawValue);

  return (
    <section
      aria-label="Calculator display"
      aria-live="polite"
      role="status"
      className="w-full bg-screen h-[88px] md:h-[128px] px-6 md:px-8 rounded-[10px] flex items-center justify-end overflow-hidden select-none"
    >
      <span
        className={`font-bold text-main tracking-[-0.7px] md:tracking-[-1px] leading-none transition-all text-right select-all truncate ${
          formatted.length > 10
            ? 'text-[28px] md:text-[40px]'
            : 'text-[40px] md:text-[56px]'
        }`}
      >
        {formatted}
      </span>
    </section>
  );
}
