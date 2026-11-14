/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './taskbar-player.html',
    './desktop-lyric.html',
    './plugin-window.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './plugin-window/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-text': 'var(--color-primary-text)',
        'on-primary': 'var(--color-on-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        'bg-sidebar': 'var(--color-bg-sidebar)',
        'bg-main': 'var(--color-bg-main)',
        'bg-card': 'var(--color-bg-card)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-dialog': 'var(--color-bg-dialog)',
        'bg-player': 'var(--color-bg-player)',
        'bg-info-card': 'var(--color-bg-info-card)',
        'text-main': 'var(--color-text-main)',
        'text-secondary': 'var(--color-text-secondary)',
        'border-light': 'var(--color-border-light)',
      },
    },
  },
  plugins: [],
};
