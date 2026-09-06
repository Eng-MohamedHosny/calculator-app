import React, { useState, useEffect, useReducer } from 'react';
import Header from './components/Header';
import Screen from './components/Screen';
import Keypad from './components/Keypad';
import Footer from './components/Footer';
import {
  calculatorReducer,
  INITIAL_STATE,
  ACTIONS,
} from './lib/calculator';

function getInitialTheme() {
  const saved = localStorage.getItem('calc-theme');
  if (saved && ['1', '2', '3'].includes(saved)) {
    return parseInt(saved, 10);
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 2;
  }
  return 1;
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [calcState, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  // Sync theme to <html> data-theme and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', String(theme));
    localStorage.setItem('calc-theme', String(theme));
  }, [theme]);

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      // Don't capture keys if an input is focused (none exist in this app, but good practice)
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      // Don't double-fire: if focus is on a button, let the native control handle Enter/Space
      const onButton = !!e.target?.closest?.('button');
      if (onButton && (key === 'Enter' || key === ' ')) return;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        dispatch({ type: ACTIONS.ADD_DIGIT, digit: key });
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        dispatch({ type: ACTIONS.ADD_DECIMAL });
      } else if (key === '+') {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OP, operation: '+' });
      } else if (key === '-') {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OP, operation: '-' });
      } else if (key === '*' || key.toLowerCase() === 'x') {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OP, operation: '*' });
      } else if (key === '/') {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OP, operation: '/' });
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        dispatch({ type: ACTIONS.EQUALS });
      } else if (key === 'Backspace' || key === 'Delete') {
        e.preventDefault();
        dispatch({ type: ACTIONS.DELETE });
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        e.preventDefault();
        dispatch({ type: ACTIONS.RESET });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-main flex flex-col justify-between items-center px-6 py-8 md:py-14 transition-colors duration-200">
      <main className="w-full max-w-[327px] md:max-w-[540px] flex flex-col gap-6 my-auto">
        <Header theme={theme} setTheme={setTheme} />
        <Screen current={calcState.current} previous={calcState.previous} />
        <Keypad dispatch={dispatch} />
      </main>
      <Footer />
    </div>
  );
}
