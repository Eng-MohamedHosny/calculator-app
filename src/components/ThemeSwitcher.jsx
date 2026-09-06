import React from 'react';

export default function ThemeSwitcher({ theme, setTheme }) {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setTheme((prev) => (prev === 3 ? 1 : prev + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setTheme((prev) => (prev === 1 ? 3 : prev - 1));
    }
  };

  const handleTrackClick = (e) => {
    // Determine which third of track was clicked
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const third = rect.width / 3;
    if (clickX < third) {
      setTheme(1);
    } else if (clickX < third * 2) {
      setTheme(2);
    } else {
      setTheme(3);
    }
  };

  return (
    <div className="flex items-end gap-6 select-none">
      <span
        id="theme-label"
        className="text-[12px] font-bold tracking-[1px] text-main uppercase pb-[4px]"
      >
        Theme
      </span>

      <div className="flex flex-col items-center w-[68px]">
        {/* Numbers 1, 2, 3 */}
        <div className="grid grid-cols-3 w-full text-center text-[12px] font-bold text-main leading-none mb-1">
          <button
            type="button"
            onClick={() => setTheme(1)}
            aria-label="Theme 1"
            className="cursor-pointer hover:opacity-75 focus-visible:outline-none focus-visible:underline"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setTheme(2)}
            aria-label="Theme 2"
            className="cursor-pointer hover:opacity-75 focus-visible:outline-none focus-visible:underline"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setTheme(3)}
            aria-label="Theme 3"
            className="cursor-pointer hover:opacity-75 focus-visible:outline-none focus-visible:underline"
          >
            3
          </button>
        </div>

        {/* Track */}
        <div
          role="radiogroup"
          aria-labelledby="theme-label"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleTrackClick}
          className="relative w-[68px] h-[26px] bg-toggle-bg rounded-[13px] p-[5px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toggle-knob"
        >
          {/* Radio items for screen readers */}
          <span
            role="radio"
            aria-checked={theme === 1}
            aria-label="Theme 1 (Dark Navy)"
            className="sr-only"
          />
          <span
            role="radio"
            aria-checked={theme === 2}
            aria-label="Theme 2 (Light Gray)"
            className="sr-only"
          />
          <span
            role="radio"
            aria-checked={theme === 3}
            aria-label="Theme 3 (Purple Neon)"
            className="sr-only"
          />

          {/* Sliding Knob */}
          <div
            className={`w-4 h-4 rounded-full bg-toggle-knob hover:bg-toggle-knob-hover transition-transform duration-150 ease-out ${
              theme === 1
                ? 'translate-x-0'
                : theme === 2
                ? 'translate-x-[21px]'
                : 'translate-x-[42px]'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
