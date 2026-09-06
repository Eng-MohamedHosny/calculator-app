import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header({ theme, setTheme }) {
  return (
    <header className="flex items-end justify-between w-full select-none">
      <h1 className="text-[32px] font-bold tracking-[-0.5px] leading-none text-main">
        calc
      </h1>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </header>
  );
}
