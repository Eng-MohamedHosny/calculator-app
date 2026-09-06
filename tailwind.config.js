/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        'page': 'var(--bg-main)',
        'page-text': 'var(--text-main)',
        'keypad': 'var(--bg-keypad)',
        'screen': 'var(--bg-screen)',
        'key-digit': {
          DEFAULT: 'var(--key-digit-bg)',
          hover: 'var(--key-digit-hover)',
          text: 'var(--key-digit-text)',
          shadow: 'var(--key-digit-shadow)',
        },
        'key-2nd': {
          DEFAULT: 'var(--key-2nd-bg)',
          hover: 'var(--key-2nd-hover)',
          text: 'var(--key-2nd-text)',
          shadow: 'var(--key-2nd-shadow)',
        },
        'key-acc': {
          DEFAULT: 'var(--key-acc-bg)',
          hover: 'var(--key-acc-hover)',
          text: 'var(--key-acc-text)',
          shadow: 'var(--key-acc-shadow)',
        },
        'toggle': {
          bg: 'var(--toggle-bg)',
          knob: 'var(--toggle-knob)',
          'knob-hover': 'var(--toggle-knob-hover)',
        },
      },
      boxShadow: {
        'key-digit': 'inset 0 -4px 0 var(--key-digit-shadow)',
        'key-2nd': 'inset 0 -4px 0 var(--key-2nd-shadow)',
        'key-acc': 'inset 0 -4px 0 var(--key-acc-shadow)',
        'key-digit-active': 'inset 0 -2px 0 var(--key-digit-shadow)',
        'key-2nd-active': 'inset 0 -2px 0 var(--key-2nd-shadow)',
        'key-acc-active': 'inset 0 -2px 0 var(--key-acc-shadow)',
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
