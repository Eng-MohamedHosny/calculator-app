import React from 'react';
import { Calculator } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full text-center text-[11px] text-main opacity-75 py-4 select-none flex items-center justify-center gap-1">
      <Calculator className="w-3.5 h-3.5 inline-block opacity-80" aria-hidden="true" />
      <span>
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current rounded-sm"
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current rounded-sm"
        >
          Developer
        </a>
        .
      </span>
    </footer>
  );
}
